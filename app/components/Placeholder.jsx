// DELETE THIS ONCE IT IS NO LONGER USED
export function Placeholder({ children, className = 'min-h-60' }) {
  return (
    <div
      className={`flex items-center justify-center border-2 border-dashed p-6 text-center font-semibold uppercase tracking-widest opacity-50 ${className}`}
    >
      {children}
    </div>
  )
}
