import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Apply } from './pages/Apply'
import { Contact } from './pages/Contact'
import { Home } from './pages/Home'
import { Menu } from './pages/Menu'
import { OurStory } from './pages/OurStory'

const BASE_TITLE = 'Postal 98 Cafe'
const titles: Record<string, string> = {
  '/': 'Postal 98 Cafe | A Coffee / Tea / Pastries Shop in Pinecraft Sarasota, FL',
  '/menu': `Menu | ${BASE_TITLE}`,
  '/our-story': `Our Story | ${BASE_TITLE}`,
  '/contact': `Contact | ${BASE_TITLE}`,
  '/apply': `Employment Application | ${BASE_TITLE}`,
}

/** Scroll to top on route change, or to the hash target (offset for the fixed header). */
function useScrollRestoration() {
  const { pathname, hash } = useLocation()
  const firstRender = useRef(true)
  useEffect(() => {
    // jump instantly when the page is opened with a hash, animate for in-page clicks
    const behavior: ScrollBehavior = firstRender.current ? 'auto' : 'smooth'
    firstRender.current = false
    document.title = titles[pathname] ?? BASE_TITLE
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
    <div className="pt-[80px] lg:pt-[110px]">
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
