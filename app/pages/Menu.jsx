import heroImage from '../assets/hero-menu.jpg'
import { Hero } from '../components/Hero'
import { Placeholder } from '../components/Placeholder'
import { Section } from '../components/Section'
import { WeeklySpecials } from '../components/WeeklySpecials'
import { site } from '../data/site'

export const meta = () => [
  { title: 'Menu | Postal 98 Cafe' },
  {
    name: 'description',
    content: 'Coffee, tea, pastries and weekly specials at Postal 98 Cafe in Pinecraft, Sarasota.',
  },
]

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

function Category({ title }) {
  return (
    <div>
      <h3 className="eyebrow mb-4 text-accent">{title}</h3>
      <Placeholder>{title} photos</Placeholder>
    </div>
  )
}

function OurMenu() {
  return (
    <Section title="Our Menu" dark>
      <div className="grid gap-10 pt-6 md:grid-cols-2 lg:grid-cols-3">
        <Category title="Breakfast" />
        <Category title="Family Favorites" />
        <Category title="Sandwiches" />
        <Category title="First Class Drinks" />
        <Category title="Pastries" />
        <Category title="Traditional Drinks" />
      </div>
      <div className="mt-10 flex justify-center">
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
