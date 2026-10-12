type Props = {
  /** Section heading rendered on a white (or black) band over the stripes. */
  title?: string
  dark?: boolean
  /** Band sits on the stripe's top edge instead of overlapping it by 9px. */
  flush?: boolean
  className?: string
}

/** Full-width band with the diagonal butcher-stripe background, optionally carrying a heading. */
export function Stripe({ title, dark, flush, className = '' }: Props) {
  const stripes = dark
    ? 'bg-[url(/assets/raw/butcher-image-11.png)]'
    : 'bg-[url(/assets/raw/butcher-image-11-2.png)]'
  return (
    <div className={`relative bg-center bg-repeat-x ${stripes} ${className}`.trim()}>
      {title && (
        <div
          className={`mx-auto max-w-150 text-center max-md:max-w-7/10 ${flush ? '' : '-mt-2.25'} ${dark ? 'bg-black' : 'bg-paper'}`}
        >
          <h1 className={`font-lobster text-[80px] max-md:text-[65px] ${dark ? 'text-paper' : ''}`}>
            {title}
          </h1>
        </div>
      )}
    </div>
  )
}
