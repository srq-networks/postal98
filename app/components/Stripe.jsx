export function Stripe({ children, className = '' }) {
  return (
    <div className="stripes">
      <h2
        className={`mx-auto max-w-150 px-4 text-center font-lobster text-7xl max-md:text-5xl ${className}`}
      >
        {children}
      </h2>
    </div>
  )
}
