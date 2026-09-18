import type { ImgHTMLAttributes } from 'react'
import { FORMATS, imageUrl, KINDS, type Kind, MIME } from '../lib/assets'

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> & {
  kind: Kind
  /** WordPress upload path (see src/lib/assets.ts), not a URL. */
  src: string
  /** Required when the kind has several widths. */
  sizes?: string
}

/** Responsive <picture>: JPEG XL → AVIF → WebP sources, progressive JPEG fallback. */
export function Picture({ kind, src, sizes, alt = '', loading = 'lazy', ...img }: Props) {
  const widths: readonly number[] = KINDS[kind].widths
  const srcSet = (format: (typeof FORMATS)[number]) =>
    widths.length === 1
      ? imageUrl(kind, src, format, widths[0])
      : widths.map((w) => `${imageUrl(kind, src, format, w)} ${w}w`).join(', ')
  const largest = widths[widths.length - 1]

  return (
    <picture>
      {FORMATS.filter((f) => f !== 'jpg').map((f) => (
        <source key={f} type={MIME[f]} srcSet={srcSet(f)} sizes={sizes} />
      ))}
      <img
        src={imageUrl(kind, src, 'jpg', largest)}
        srcSet={widths.length > 1 ? srcSet('jpg') : undefined}
        sizes={sizes}
        alt={alt}
        loading={loading}
        decoding="async"
        {...img}
      />
    </picture>
  )
}
