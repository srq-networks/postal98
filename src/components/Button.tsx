import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'

type Variant = 'default' | 'outline' | 'black'

/** Divi .et_pb_button: on hover the right padding grows and the arrow slides into it. */
const base =
  'group/btn relative inline-flex cursor-pointer items-center px-[1em] py-[0.3em] font-cairo text-sm leading-[1.7em] tracking-[2px] text-paper uppercase transition-all duration-300 hover:bg-brand-red-hover hover:pr-[2.2em] hover:pl-[0.7em]'
const variants: Record<Variant, string> = {
  default: 'border-10 border-transparent bg-brand-red font-bold',
  outline: 'border border-paper bg-brand-red font-semibold',
  black: 'border-10 border-transparent bg-black font-bold',
}
const arrow =
  'absolute top-1/2 right-[0.6em] -translate-x-[0.5em] -translate-y-1/2 opacity-0 transition-all duration-300 group-hover/btn:translate-x-0 group-hover/btn:opacity-100'

type Props = {
  children: ReactNode
  /** Absolute URL or same-site file (PDF). Opened in a new tab when `external`. */
  href?: string
  /** Router path, may include a hash (e.g. "/contact#contact_section"). */
  to?: string
  external?: boolean
  variant?: Variant
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}

export function Button({
  children,
  href,
  to,
  external,
  variant = 'default',
  type,
  disabled,
  className = '',
}: Props) {
  const cls = `${base} ${variants[variant]} ${className}`.trim()
  const content = (
    <>
      {children}
      <ArrowRight
        className={`${arrow} ${variant === 'outline' ? 'size-[1em] text-black' : 'size-[1.3em]'}`}
      />
    </>
  )
  if (to) {
    return (
      <Link to={to} className={cls}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a
        href={href}
        className={cls}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    )
  }
  return (
    <button type={type ?? 'button'} className={cls} disabled={disabled}>
      {content}
    </button>
  )
}
