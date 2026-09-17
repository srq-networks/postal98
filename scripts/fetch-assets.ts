// Downloads every asset the site uses from postal98cafe.com (once, into
// assets/raw/) and writes the processed files under public/assets/.
//
//   bun run assets
//
// Output layout (see src/lib/assets.ts for the matching URL helpers):
//   public/assets/thumbs/<key>.jpg   400x516 cover crop  (gallery grid)
//   public/assets/full/<key>.jpg     <=1600px long edge  (lightbox / photos)
//   public/assets/bg/<key>.<ext>     <=1920px wide       (hero + section backgrounds)
//   public/assets/raw/<file>         copied as-is        (logo, patterns, pdf, font, icons)
//   public/assets/raw/<video>.mp4    ffmpeg re-encode    (hero video)

import { mkdir, stat } from 'node:fs/promises'
import { basename, join } from 'node:path'
import sharp from 'sharp'
import { allGalleryImages } from '../src/data/galleries'
import { uploads } from '../src/data/site'
import { assetKey, UPLOADS_BASE } from '../src/lib/assets'

const RAW_DIR = 'assets/raw'
const OUT = 'public/assets'
const UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36'

type Role = 'gallery' | 'photo' | 'bg' | 'copy' | 'video'
const plan = new Map<string, Role>()
const add = (role: Role, ...paths: string[]) => {
  for (const p of paths) if (!plan.has(p)) plan.set(p, role)
}

add('gallery', ...allGalleryImages())
add('photo', uploads.somethingUnique, uploads.ourStoryPhoto)
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
add(
  'copy',
  uploads.logo,
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

async function processAsset(uploadPath: string, role: Role, raw: string) {
  const key = assetKey(uploadPath)
  const file = basename(uploadPath)
  const jpg = { quality: 82, mozjpeg: true }
  switch (role) {
    case 'gallery': {
      const thumb = `${OUT}/thumbs/${key}.jpg`
      const full = `${OUT}/full/${key}.jpg`
      if (!(await exists(thumb)))
        await sharp(raw).rotate().resize(400, 516, { fit: 'cover' }).jpeg(jpg).toFile(thumb)
      if (!(await exists(full)))
        await sharp(raw)
          .rotate()
          .resize(1600, 1600, { fit: 'inside', withoutEnlargement: true })
          .jpeg(jpg)
          .toFile(full)
      return
    }
    case 'photo': {
      const full = `${OUT}/full/${key}.jpg`
      if (!(await exists(full)))
        await sharp(raw)
          .rotate()
          .resize(1600, 1600, { fit: 'inside', withoutEnlargement: true })
          .jpeg(jpg)
          .toFile(full)
      return
    }
    case 'bg': {
      const png = file.toLowerCase().endsWith('.png')
      const out = `${OUT}/bg/${key}.${png ? 'png' : 'jpg'}`
      if (await exists(out)) return
      const img = sharp(raw).rotate().resize(1920, undefined, { withoutEnlargement: true })
      await (png ? img.png({ compressionLevel: 9 }) : img.jpeg(jpg)).toFile(out)
      return
    }
    case 'copy': {
      const out = `${OUT}/raw/${file}`
      if (!(await exists(out))) await Bun.write(out, Bun.file(raw))
      return
    }
    case 'video': {
      const out = `${OUT}/raw/${file}`
      if (await exists(out)) return
      const proc = Bun.spawn(
        [
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
        ],
        { stderr: 'pipe' },
      )
      if ((await proc.exited) !== 0) {
        console.warn(`ffmpeg failed for ${file}; copying original`)
        await Bun.write(out, Bun.file(raw))
      }
      return
    }
  }
}

await Promise.all(
  ['thumbs', 'full', 'bg', 'raw'].map((d) => mkdir(`${OUT}/${d}`, { recursive: true })),
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
await Promise.all(Array.from({ length: 6 }, worker))

console.log(`processed ${done - failures.length}/${plan.size} assets`)
if (failures.length) {
  console.error(`FAILED:\n  ${failures.join('\n  ')}`)
  process.exit(1)
}
