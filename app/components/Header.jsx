import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import logo from '../assets/logo.jpg?logo'
import { site } from '../data/site'
import { Icon } from './icons'
import { Picture } from './Picture'

function useScrolled() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return scrolled
}

function Logo() {
  return (
    <Link to="/" className="flex h-full items-center">
      <Picture
        picture={logo}
        alt={site.name}
        sizes="214px"
        loading="eager"
        className="h-3/4 w-auto"
      />
    </Link>
  )
}

const navLink = ({ isActive }) => (isActive ? 'link text-accent' : 'link')

function Nav({ open }) {
  return (
    <nav
      aria-label="Main"
      className={`flex gap-6 font-bold text-lg tracking-widest max-lg:absolute max-lg:inset-x-0 max-lg:border-accent max-lg:border-t-3 max-lg:bg-white max-lg:px-8 max-lg:py-4 max-lg:shadow-md ${open ? '' : 'max-lg:hidden'}`}
    >
      <NavLink to="/" className={navLink}>
        Home
      </NavLink>
      <NavLink to="/menu" className={navLink}>
        Menu
      </NavLink>
      <a href={site.links.orderOnline} target="_blank" rel="noreferrer" className="link">
        Order Online
      </a>
      <NavLink to="/our-story" className={navLink}>
        Our Story
      </NavLink>
      <NavLink to="/contact" className={navLink}>
        Contact
      </NavLink>
    </nav>
  )
}

export function Header() {
  const scrolled = useScrolled()
  // The menu stays open only on the page it was opened on, so navigating closes it.
  const { pathname } = useLocation()
  const [openOn, setOpenOn] = useState(null)
  const open = openOn === pathname

  return (
    <header
      className={`fixed top-0 z-50 w-full border-black/10 border-b bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}
    >
      <div
        className={`row flex h-20 items-center justify-between transition-all duration-300 ${scrolled ? 'lg:h-14' : 'lg:h-28'}`}
      >
        <Logo />
        <Nav open={open} />
        <button
          type="button"
          className="text-accent lg:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpenOn(open ? null : pathname)}
        >
          <Icon name="menu" className="text-3xl" />
        </button>
      </div>
    </header>
  )
}
