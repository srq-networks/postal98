import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { site, uploads } from '../data/site'
import { rawUrl } from '../lib/assets'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Order Online', href: site.links.orderOnline },
  { label: 'Our Story', to: '/our-story' },
  { label: 'Contact', to: '/contact' },
]

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `block transition-opacity duration-300 hover:opacity-70 ${isActive ? 'text-brand-yellow' : 'text-black/60'}`

export function Header() {
  const [fixed, setFixed] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setFixed(window.scrollY > 0)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: close the mobile menu on navigation
  useEffect(() => setOpen(false), [pathname])

  const navPad = fixed
    ? 'lg:pt-[20px] lg:[&>ul>li>a]:pb-[20px]'
    : 'lg:pt-[48px] lg:[&>ul>li>a]:pb-[48px]'

  return (
    <header
      className={`fixed top-0 left-0 z-[99999] w-full bg-white transition-[height,box-shadow] duration-400 ${
        fixed ? 'shadow-[0_0_7px_rgba(0,0,0,0.1)]' : 'shadow-[0_1px_0_rgba(0,0,0,0.1)]'
      }`}
    >
      <div
        className={`row !py-0 flex after:hidden items-center justify-between transition-[height] duration-400 ${
          fixed ? 'h-[80px] lg:h-[54px]' : 'h-[80px] lg:h-[110px]'
        }`}
      >
        <Link to="/" className="flex h-full max-w-1/2 items-center">
          <img
            src={rawUrl(uploads.logo)}
            alt="Postal 98 Cafe"
            className="h-[77%] w-auto transition-all duration-400"
            width={720}
            height={283}
          />
        </Link>

        <nav
          className={`hidden lg:block font-open text-[17px] font-bold tracking-[1px] leading-[14px] ${navPad}`}
        >
          <ul className="flex">
            {links.map((l) => (
              <li key={l.label} className="pr-[22px] last:pr-0">
                {l.to ? (
                  <NavLink to={l.to} className={linkClass}>
                    {l.label}
                  </NavLink>
                ) : (
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass({ isActive: false })}
                  >
                    {l.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="lg:hidden text-brand-yellow"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <Menu size={32} />
        </button>
      </div>

      {open && (
        <ul className="lg:hidden absolute left-0 w-full bg-white p-[5%] border-t-[3px] border-brand-yellow shadow-[0_2px_5px_rgba(0,0,0,0.1)]">
          {links.map((l) => (
            <li key={l.label}>
              {l.to ? (
                <Link
                  to={l.to}
                  className="block border-b border-black/[0.03] px-[5%] py-[10px] text-[14px] text-muted"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-b border-black/[0.03] px-[5%] py-[10px] text-[14px] text-muted"
                >
                  {l.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
