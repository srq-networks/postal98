import { useState } from 'react'
import heroImage from '../assets/hero-menu.jpg?hero'
import { Hero } from '../components/Hero'
import { Section } from '../components/Section'
import { WeeklySpecials } from '../components/WeeklySpecials'
import { formatPrice, menu } from '../data/menu'
import { site } from '../data/site'

export const meta = () => [
  { title: 'Menu | Postal 98 Cafe' },
  {
    name: 'description',
    content: 'Coffee, tea, pastries and weekly specials at Postal 98 Cafe in Pinecraft, Sarasota.',
  },
]

const SIZES = [12, 16, 20]

const pill =
  'cursor-pointer rounded-full border border-white/35 px-4 py-2 font-bold text-sm text-white uppercase tracking-widest transition-colors hover:border-accent hover:text-accent aria-pressed:border-brand aria-pressed:bg-brand'
const price = 'w-16 py-3 text-right align-top font-bold text-accent'

function JustForYou() {
  return (
    <Hero
      eyebrow="Just for you"
      title="Something Delicious For Everyone"
      mustache="Favorite Family Flavors"
      image={heroImage}
    />
  )
}

function MenuItem({ item, sizes }) {
  return (
    <tr className="border-white/10 border-b border-dashed last:border-b-0">
      <th scope="row" className="py-3 pr-4 text-left align-top font-bold text-white">
        {item.name}
        {item.description && (
          <p className="font-medium text-sm text-white/70">{item.description}</p>
        )}
        {item.choices && (
          <p className="font-medium text-sm text-white/70">{item.choices.join(' · ')}</p>
        )}
        {item.note && <p className="font-semibold text-sm text-white/50 italic">{item.note}</p>}
      </th>
      {sizes.length > 0 ? (
        sizes.map((size) => (
          <td key={size} className={price}>
            {item.sizes[size] ? formatPrice(item.sizes[size]) : '—'}
          </td>
        ))
      ) : (
        <td className={price}>{item.price && formatPrice(item.price)}</td>
      )}
    </tr>
  )
}

/** One card per menu section. Size columns appear only when an item is priced by size. */
function MenuCard({ section }) {
  const sizes = SIZES.filter((size) => section.items.some((item) => item.sizes?.[size]))
  return (
    <section className="mb-8 break-inside-avoid border border-white/15 bg-white/5 p-6">
      <header className="mb-2 border-white/15 border-b pb-4 text-center">
        <h3 className="font-lobster text-4xl text-white">{section.title}</h3>
        {section.note && <p className="eyebrow text-accent text-xs">{section.note}</p>}
      </header>
      <table className="w-full">
        {sizes.length > 0 && (
          <thead>
            <tr>
              <td />
              {sizes.map((size) => (
                <th
                  key={size}
                  scope="col"
                  className="eyebrow pt-2 text-right text-white/60 text-xs"
                >
                  {size} oz
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {section.items.map((item) => (
            <MenuItem key={item.name} item={item} sizes={sizes} />
          ))}
        </tbody>
      </table>
    </section>
  )
}

function OurMenu() {
  const [category, setCategory] = useState(null)
  const sections = (category ? [category] : menu).flatMap((c) => c.sections)
  return (
    <Section title="Our Menu" dark>
      <p className="mx-auto mb-8 max-w-150 text-center font-semibold leading-loose">
        Freshly ground Guatemalan coffee, breakfast till noon, and paninis all day. Pick a category
        below, or order ahead for pickup.
      </p>
      <fieldset className="flex flex-wrap justify-center gap-2">
        <legend className="sr-only">Filter the menu by category</legend>
        <button
          type="button"
          className={pill}
          aria-pressed={category === null}
          onClick={() => setCategory(null)}
        >
          All
        </button>
        {menu.map((c) => (
          <button
            key={c.title}
            type="button"
            className={pill}
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {c.title}
          </button>
        ))}
      </fieldset>
      <div
        className={`mt-10 gap-8 ${sections.length === 1 ? 'mx-auto max-w-180' : 'lg:columns-2'}`}
      >
        {sections.map((section) => (
          <MenuCard key={section.title} section={section} />
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <a href={site.links.orderOnline} target="_blank" rel="noreferrer" className="btn">
          Order Online
        </a>
      </div>
    </Section>
  )
}

export default function Menu() {
  return (
    <>
      <JustForYou />
      <OurMenu />
      <WeeklySpecials />
    </>
  )
}
