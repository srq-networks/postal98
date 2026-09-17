// Every image on the site was uploaded to WordPress; we keep its upload path
// (e.g. "2020/05/IMG_1586.jpg") as the stable id. scripts/fetch-assets.ts
// downloads the originals and writes the processed files these helpers point at.

export const UPLOADS_BASE = 'https://postal98cafe.com/wp-content/uploads/'

/** "2020/05/IMG_1586-scaled.jpg" -> "IMG_1586-scaled" */
export const assetKey = (uploadPath: string) =>
  uploadPath.slice(uploadPath.lastIndexOf('/') + 1).replace(/\.[a-z0-9]+$/i, '')

/** Divi's 400x516 gallery thumbnail equivalent. */
export const thumbUrl = (uploadPath: string) => `/assets/thumbs/${assetKey(uploadPath)}.jpg`

/** Full-size image used by the lightbox (max 1600px long edge). */
export const fullUrl = (uploadPath: string) => `/assets/full/${assetKey(uploadPath)}.jpg`

/** Section / hero background (max 1920px wide). */
export const bgUrl = (uploadPath: string) =>
  `/assets/bg/${assetKey(uploadPath)}.${uploadPath.toLowerCase().endsWith('.png') ? 'png' : 'jpg'}`

/** Copied as-is (patterns, logo, video, pdf, font, icons). */
export const rawUrl = (uploadPath: string) =>
  `/assets/raw/${uploadPath.slice(uploadPath.lastIndexOf('/') + 1)}`
