import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Apply } from './pages/Apply'
import { Contact } from './pages/Contact'
import { Home } from './pages/Home'
import { Menu } from './pages/Menu'
import { OurStory } from './pages/OurStory'

const titles: Record<string, string> = {
  '/': 'Postal 98 Cafe | A Coffee / Tea / Pastries Shop in Pinecraft Sarasota, FL',
  '/menu': `Menu | Postal 98 Cafe`,
  '/our-story': `Our Story | Postal 98 Cafe`,
  '/contact': `Contact | Postal 98 Cafe`,
  '/apply': `Employment Application | Postal 98 Cafe`,
}

/** Scroll to top on route change, or to the hash target (offset for the fixed header). */
function useScrollRestoration() {
  const { pathname, hash } = useLocation()
  const firstRender = useRef(true)
  useEffect(() => {
    // jump instantly when the page is opened with a hash, animate for in-page clicks
    const behavior: ScrollBehavior = firstRender.current ? 'auto' : 'smooth'
    firstRender.current = false
    document.title = titles[pathname] ?? 'Postal 98 Cafe'
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const el = document.getElementById(hash.slice(1))
    if (!el) return
    const jump = () => {
      const header = document.querySelector('header')
      const offset = header ? header.getBoundingClientRect().height : 0
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior })
    }
    jump()
    // fonts and the hero video can still shift layout on a fresh load; re-align once they settle
    const t = window.setTimeout(jump, 400)
    return () => window.clearTimeout(t)
  }, [pathname, hash])
}

export default function App() {
  useScrollRestoration()
  return (
    <div className="pt-20 lg:pt-27.5">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
