import type { ReactNode } from 'react'

type Props = {
  /** Section heading rendered on a white (or black) band over the stripes. */
  title?: string
  dark?: boolean
  className?: string
  children?: ReactNode
}

/** Divi row with the diagonal butcher-stripe background, optionally carrying a heading. */
export function Stripe({ title, dark, className = '', children }: Props) {
  return (
    <div className={`row row-full stripe ${dark ? 'stripe-dark' : ''} ${className}`.trim()}>
      {title && (
        <div className={`txt title-band ${dark ? 'title-band-dark' : ''}`}>
          <h1>{title}</h1>
        </div>
      )}
      {children}
    </div>
  )
}
