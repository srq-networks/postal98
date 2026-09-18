// Every image on the site was uploaded to WordPress; we keep its upload path
// (e.g. "2020/05/IMG_1586.jpg") as the stable id. scripts/fetch-assets.ts
// downloads the originals and writes every <kind>/<key>-<width>.<format>
// variant that imageUrl() points at; src/components/Picture.tsx renders them.

export const UPLOADS_BASE = 'https://postal98cafe.com/wp-content/uploads/'

/** Encodings in <picture> source order: first supported one wins. */
export const FORMATS = ['jxl', 'avif', 'webp', 'jpg'] as const
export type Format = (typeof FORMATS)[number]

export const MIME: Record<Format, string> = {
  jxl: 'image/jxl',
  avif: 'image/avif',
  webp: 'image/webp',
  jpg: 'image/jpeg',
}

/** Output variants per image kind. `cover` crops to width × height (or width / ratio),
 *  `inside` fits within a width × width box without enlarging. */
export const KINDS = {
  /** Gallery grid thumbnails (Divi's 400×516). */
  thumbs: { widths: [400], fit: 'cover', height: 516 },
  /** Home "House Favorites" cards (.feature-card img is 4:3). */
  cards: { widths: [480, 800], fit: 'cover', ratio: 3 / 4 },
  /** Story / "Something Unique" photos and lightbox slides. */
  full: { widths: [800, 1600], fit: 'inside' },
  /** Hero and section backgrounds. */
  bg: { widths: [1024, 1920], fit: 'inside' },
  /** Header logo (shown at ~216px, 440 covers 2× displays). */
  logo: { widths: [440], fit: 'inside' },
} as const
export type Kind = keyof typeof KINDS

/** "2020/05/IMG_1586-scaled.jpg" -> "IMG_1586-scaled" */
export const assetKey = (uploadPath: string) =>
  uploadPath.slice(uploadPath.lastIndexOf('/') + 1).replace(/\.[a-z0-9]+$/i, '')

export const imageUrl = (kind: Kind, uploadPath: string, format: Format, width: number) =>
  `/assets/${kind}/${assetKey(uploadPath)}-${width}.${format}`

/** Copied as-is (patterns, video, pdf, font, icons). */
export const rawUrl = (uploadPath: string) =>
  `/assets/raw/${uploadPath.slice(uploadPath.lastIndexOf('/') + 1)}`
