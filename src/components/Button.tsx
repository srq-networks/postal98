import type { ReactNode } from 'react'
import { Link } from 'react-router'

type Props = {
  children: ReactNode
  /** Absolute URL or same-site file (PDF). Opened in a new tab when `external`. */
  href?: string
  /** Router path, may include a hash (e.g. "/contact#contact_section"). */
  to?: string
  external?: boolean
  variant?: 'default' | 'outline' | 'black'
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}

const variantClass = { default: '', outline: 'btn-outline', black: 'btn-black' }

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
  const cls = `btn ${variantClass[variant]} ${className}`.trim()
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
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
        {children}
      </a>
    )
  }
  return (
    <button type={type ?? 'button'} className={cls} disabled={disabled}>
      {children}
    </button>
  )
}
