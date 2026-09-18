import { type ComponentProps, lazy, Suspense } from 'react'

/** yet-another-react-lightbox (+ its CSS) loaded on demand: mount only while a slide is open. */
const Lazy = lazy(async () => {
  await import('yet-another-react-lightbox/styles.css')
  return import('yet-another-react-lightbox')
})

type Props = Omit<ComponentProps<typeof Lazy>, 'open'>

export function Lightbox(props: Props) {
  return (
    <Suspense fallback={null}>
      <Lazy open {...props} />
    </Suspense>
  )
}
