// Downloads every asset the site uses from postal98cafe.com (once, into
// assets/raw/) and writes the processed files under public/assets/.
//
//   bun run assets            (needs sharp + ffmpeg + cjxl on PATH)
//
// Every image is written once per width in KINDS (src/lib/assets.ts) and once
// per format: <kind>/<key>-<width>.{jxl,avif,webp,jpg}. src/components/Picture.tsx
// renders the matching <picture>. Non-image files are copied to raw/:
//   public/assets/raw/<file>         copied as-is  (patterns, pdf, font, icons)
//   public/assets/raw/<video>.mp4    ffmpeg re-encode (hero video)

import { mkdir, stat, unlink } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { basename, join } from 'node:path'
import sharp from 'sharp'
import { homeOtherItems } from '../src/data/galleries'
import { allMenuPhotos } from '../src/data/menu'
import { uploads } from '../src/data/site'
import { assetKey, FORMATS, KINDS, type Kind, UPLOADS_BASE } from '../src/lib/assets'

const RAW_DIR = 'assets/raw'
const OUT = 'public/assets'
const UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36'

if (!Bun.which('cjxl')) {
  console.error('cjxl not found on PATH (Arch: pacman -S libjxl) — needed for the JPEG XL variants')
  process.exit(1)
}

type Role = Kind | 'copy' | 'video'
const plan = new Map<string, Role>()
const add = (role: Role, ...paths: string[]) => {
  for (const p of paths) if (!plan.has(p)) plan.set(p, role)
}

add('thumbs', ...homeOtherItems.images)
add('cards', ...allMenuPhotos())
add('full', uploads.somethingUnique, uploads.ourStoryPhoto)
add(
  'bg',
  uploads.heroPoster,
  uploads.menuHero,
  uploads.ourStoryHero,
  uploads.contactHero,
  uploads.contactVisitBg,
  uploads.chalkboard,
  uploads.testimonialsBg,
)
add('logo', uploads.logo)
add(
  'copy',
  uploads.stripeLight,
  uploads.stripeDark,
  uploads.cornerPattern,
  uploads.menuPdf,
  uploads.fullMenuPdf,
  uploads.employmentPdf,
  uploads.font,
  uploads.icon32,
  uploads.icon180,
  uploads.icon192,
)
add('video', uploads.heroVideo)

const exists = (p: string) =>
  stat(p).then(
    () => true,
    () => false,
  )

async function download(uploadPath: string): Promise<string> {
  const dest = join(RAW_DIR, uploadPath)
  if (await exists(dest)) return dest
  await mkdir(join(RAW_DIR, uploadPath.slice(0, uploadPath.lastIndexOf('/'))), { recursive: true })
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(UPLOADS_BASE + uploadPath, { headers: { 'User-Agent': UA } })
    if (res.ok) {
      await Bun.write(dest, await res.arrayBuffer())
      return dest
    }
    if (res.status !== 429 || attempt >= 4) throw new Error(`${res.status} ${uploadPath}`)
    await Bun.sleep(2000 * (attempt + 1))
  }
}

async function run(cmd: string[]) {
  const proc = Bun.spawn(cmd, { stderr: 'pipe' })
  if ((await proc.exited) !== 0)
    throw new Error(`${cmd[0]} failed: ${await new Response(proc.stderr).text()}`)
}

/** sharp's bundled libvips has no JPEG XL encoder, so go through a temp PNG and cjxl. */
async function toJxl(img: sharp.Sharp, out: string) {
  const tmp = join(tmpdir(), `postal98-${process.pid}-${basename(out)}.png`)
  await img.png().toFile(tmp)
  try {
    await run(['cjxl', tmp, out, '-q', '80', '-e', '7', '--quiet'])
  } finally {
    await unlink(tmp)
  }
}

async function processImage(kind: Kind, raw: string) {
  const spec = KINDS[kind]
  const key = assetKey(raw)
  for (const width of spec.widths) {
    const outputs = FORMATS.map((f) => [f, `${OUT}/${kind}/${key}-${width}.${f}`] as const)
    const missing = await Promise.all(outputs.map(async ([f, p]) => ((await exists(p)) ? null : f)))
    if (missing.every((f) => f === null)) continue
    const base = sharp(raw).rotate()
    const img =
      spec.fit === 'cover'
        ? base.resize(width, 'height' in spec ? spec.height : Math.round(width * spec.ratio), {
            fit: 'cover',
          })
        : base.resize(width, width, { fit: 'inside', withoutEnlargement: true })
    for (const [format, out] of outputs) {
      if (!missing.includes(format)) continue
      switch (format) {
        case 'jpg':
          await img.clone().jpeg({ quality: 82, mozjpeg: true, progressive: true }).toFile(out)
          break
        case 'webp':
          await img.clone().webp({ quality: 80 }).toFile(out)
          break
        case 'avif':
          await img.clone().avif({ quality: 55, effort: 4 }).toFile(out)
          break
        case 'jxl':
          await toJxl(img.clone(), out)
          break
      }
    }
  }
}

async function processAsset(uploadPath: string, role: Role, raw: string) {
  const file = basename(uploadPath)
  switch (role) {
    case 'copy': {
      const out = `${OUT}/raw/${file}`
      if (!(await exists(out))) await Bun.write(out, Bun.file(raw))
      return
    }
    case 'video': {
      const out = `${OUT}/raw/${file}`
      if (await exists(out)) return
      try {
        await run([
          'ffmpeg',
          '-y',
          '-loglevel',
          'error',
          '-i',
          raw,
          '-an',
          '-vf',
          "scale='min(1280,iw)':-2",
          '-c:v',
          'libx264',
          '-preset',
          'slow',
          '-crf',
          '26',
          '-pix_fmt',
          'yuv420p',
          '-movflags',
          '+faststart',
          out,
        ])
      } catch (err) {
        console.warn(`${(err as Error).message}; copying original`)
        await Bun.write(out, Bun.file(raw))
      }
      return
    }
    default:
      return processImage(role, raw)
  }
}

await Promise.all(
  [...Object.keys(KINDS), 'raw'].map((d) => mkdir(`${OUT}/${d}`, { recursive: true })),
)

const entries = [...plan.entries()]
let done = 0
const failures: string[] = []
const worker = async () => {
  while (entries.length) {
    const [uploadPath, role] = entries.shift() as [string, Role]
    try {
      const raw = await download(uploadPath)
      await processAsset(uploadPath, role, raw)
    } catch (err) {
      failures.push(`${uploadPath}: ${(err as Error).message}`)
    }
    done++
    if (done % 20 === 0) console.log(`${done}/${plan.size}`)
  }
}
await Promise.all(Array.from({ length: 4 }, worker))

console.log(`processed ${done - failures.length}/${plan.size} assets`)
if (failures.length) {
  console.error(`FAILED:\n  ${failures.join('\n  ')}`)
  process.exit(1)
}
