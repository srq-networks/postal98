function Stripe({ children, className }) {
  return (
    <div className="stripes">
      <h2
        className={`mx-auto max-w-150 px-4 py-10 text-center font-lobster text-7xl max-md:text-5xl ${className}`}
      >
        {children}
      </h2>
    </div>
  )
}

/** Page section with a striped title: white by default, black when `dark`. */
export function Section({ id, title, dark, children }) {
  return (
    <section id={id} className={dark ? 'bg-black pb-10 text-white/70' : 'bg-paper pb-10'}>
      {title && <Stripe className={dark ? 'bg-black text-white' : 'bg-paper'}>{title}</Stripe>}
      <div className="row">{children}</div>
    </section>
  )
}
