import { useMemo, useState } from 'react'
import { imageUrl } from '../lib/assets'
import { Lightbox } from './Lightbox'
import { Picture } from './Picture'

type Props = {
  images: string[]
  /** "stack": one per row (column galleries). "grid4": four per row. */
  layout?: 'stack' | 'grid4'
  /** The home "Other Items" gallery has pointer events disabled on the live site. */
  interactive?: boolean
  /** How many thumbnails to show; the lightbox still cycles through every image
   *  (Divi galleries on the live site show only the category title card). */
  visible?: number
}

export function Gallery({ images, layout = 'stack', interactive = true, visible }: Props) {
  const [index, setIndex] = useState(-1)
  // the same photo can appear twice in one gallery, so keys are de-duplicated
  const keyed = useMemo(() => {
    const seen = new Map<string, number>()
    return images.map((img) => {
      const n = seen.get(img) ?? 0
      seen.set(img, n + 1)
      return { img, key: n ? `${img}#${n}` : img }
    })
  }, [images])
  const cls = `${layout === 'grid4' ? 'gallery-grid4' : 'gallery-stack'} ${interactive ? '' : 'gallery-static'}`

  return (
    <div className={cls.trim()}>
      {keyed.slice(0, visible ?? keyed.length).map(({ img, key }, i) => (
        <a
          key={key}
          className="gallery-item"
          href={imageUrl('full', img, 'webp', 1600)}
          onClick={(e) => {
            e.preventDefault()
            if (interactive) setIndex(i)
          }}
        >
          <Picture kind="thumbs" src={img} width={400} height={516} />
          <span className="overlay" />
        </a>
      ))}
      {interactive && index >= 0 && (
        <Lightbox
          index={index}
          close={() => setIndex(-1)}
          slides={images.map((img) => ({ src: imageUrl('full', img, 'webp', 1600) }))}
        />
      )}
    </div>
  )
}
