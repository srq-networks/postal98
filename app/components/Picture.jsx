/** Responsive WebP image from a `?hero` / `?photo` / `?poster` / `?logo` import. */
export function Picture({ picture, alt, sizes, className, ...props }) {
  return (
    <img
      src={picture.img.src}
      srcSet={picture.sources.webp}
      width={picture.img.w}
      height={picture.img.h}
      sizes={sizes}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      {...props}
    />
  )
}
