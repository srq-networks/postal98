import { useState } from 'react'
import { Button } from '../components/Button'
import { Hero } from '../components/Hero'
import { MenuCard } from '../components/MenuCard'
import { ALL, MenuFilter } from '../components/MenuFilter'
import { OurInfo } from '../components/OurInfo'
import { Stripe } from '../components/Stripe'
import { WeeklySpecials } from '../components/WeeklySpecials'
import { menu } from '../data/menu'
import { site, uploads } from '../data/site'
import { rawUrl } from '../lib/assets'

/** schema.org Menu so search engines can index every item and price. */
const menuJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Menu',
  name: 'Postal 98 Cafe Menu',
  hasMenuSection: menu.flatMap((c) =>
    c.sections.map((s) => ({
      '@type': 'MenuSection',
      name: s.title,
      description: s.note,
      hasMenuItem: s.items.map((item) => ({
        '@type': 'MenuItem',
        name: item.name,
        description: item.description,
        offers:
          item.price !== undefined
            ? { '@type': 'Offer', price: item.price.toFixed(2), priceCurrency: 'USD' }
            : Object.entries(item.sizes ?? {}).map(([size, price]) => ({
                '@type': 'Offer',
                name: size,
                price: price.toFixed(2),
                priceCurrency: 'USD',
              })),
      })),
    })),
  ),
})

export function Menu() {
  const [category, setCategory] = useState<string>(ALL)
  const shown = category === ALL ? menu : menu.filter((c) => c.id === category)
  const sections = shown.flatMap((c) => c.sections)
  const count = sections.reduce((n, s) => n + s.items.length, 0)

  return (
    <>
      <Hero
        eyebrow="just for you"
        title="Something Delicious For Everyone"
        subline="Favorite Family Flavors"
        image={uploads.menuHero}
        padding={['6vw', '6vw']}
        titleSize="75px"
        position="center bottom 0px"
        blend="darken"
      />

      <section className="section bg-white pt-1.25! pb-13!">
        <Stripe title="Our Menu" className="py-7.5! mt-0.75!" />
      </section>

      <section className="section chalkboard pt-7.75! pb-15! -mt-12!">
        <div className="row w-9/10! max-w-295! pt-7.5! pb-0!">
          <div className="mx-auto mb-7 max-w-160 text-center font-cairo font-semibold text-base leading-[1.8em] text-white/70">
            <p>
              Freshly ground Guatemalan coffee, breakfast till noon, and paninis all day. Pick a
              category below, or order ahead for pickup.
            </p>
          </div>

          <MenuFilter categories={menu} selected={category} onSelect={setCategory} />
          <p className="sr-only" aria-live="polite">
            Showing {count} items
            {category !== ALL && ` in ${shown[0]?.title}`}
          </p>

          <div className={`menu-columns mt-9 ${sections.length === 1 ? 'menu-columns-1' : ''}`}>
            {sections.map((s) => (
              <MenuCard key={s.id} section={s} />
            ))}
          </div>

          <p className="mx-auto mt-2 max-w-160 text-center font-cairo font-semibold text-sm leading-[1.8em] text-white/55">
            Milk alternatives (oat, almond, sweet foam, half & half) add $1.25 to any drink. Prices
            and availability may change; the printed menu is the final word.
          </p>

          <div className="mt-8.5 flex flex-wrap justify-center gap-x-5 gap-y-1.5">
            <Button href={site.links.orderOnline} external>
              Order Online
            </Button>
            <Button href={rawUrl(uploads.menuPdf)} external variant="outline">
              View Full PDF Menu
            </Button>
          </div>
        </div>
        <script type="application/ld+json">{menuJsonLd}</script>
      </section>

      <WeeklySpecials variant="menu" />
      <OurInfo />
    </>
  )
}
