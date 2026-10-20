import { NavLink } from 'react-router'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  {
    label: 'Order Online',
    href: 'https://www.clover.com/online-ordering/postal-98-cafe-llc-sarasota',
  },
  { label: 'Our Story', to: '/our-story' },
  { label: 'Contact', to: '/contact' },
]

export function Header() {
  return (
    <header>
      <nav aria-label="Main">
        <ul>
          {links.map(({ label, to, href }) => (
            <li key={label}>
              {to ? (
                <NavLink to={to}>{label}</NavLink>
              ) : (
                <a href={href} target="_blank" rel="noreferrer">
                  {label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
