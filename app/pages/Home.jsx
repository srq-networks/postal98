import { Link } from 'react-router'
import heroImage from '../assets/hero-home.png?poster'
import somethingUnique from '../assets/something-unique.jpg?photo'
import { Hero } from '../components/Hero'
import { Picture } from '../components/Picture'
import { Placeholder } from '../components/Placeholder'
import { Section } from '../components/Section'
import { WeeklySpecials } from '../components/WeeklySpecials'
import { site } from '../data/site'

const otherItems = import.meta.glob('../assets/other-items/*.jpg', {
  eager: true,
  import: 'default',
  query: '?thumb',
})

export const meta = () => [
  { title: 'Postal 98 Cafe | A Coffee / Tea / Pastries Shop in Pinecraft Sarasota, FL' },
  {
    name: 'description',
    content:
      'Postal 98 Cafe is a neighborhood coffee, tea and pastry shop in Pinecraft, Sarasota, Florida.',
  },
]

function Welcome() {
  return (
    <Hero
      eyebrow="Welcome to"
      title={
        <>
          {/* Highlight 98 in yellow */}
          Postal <span className="text-accent">98</span> Cafe
        </>
      }
      mustache="A Family Place"
      image={heroImage}
      video="/hero-home.mp4"
      // Attribute makes this hero taller than default
      tall
    >
      <div className="mt-10 flex flex-wrap justify-center gap-6 lg:gap-24">
        <Link to="/menu" className="btn">
          View Menu
        </Link>
        <a href={site.links.orderOnline} target="_blank" rel="noreferrer" className="btn">
          Order Online
        </a>
      </div>
    </Hero>
  )
}

function SomethingUnique() {
  return (
    <Section>
      <div className="grid items-center gap-10 pt-16 lg:grid-cols-5">
        <div className="space-y-6 font-semibold leading-loose lg:col-span-3">
          <p className="eyebrow text-brand">Est. 2020</p>
          <h2 className="text-7xl max-md:text-5xl">Something Unique</h2>
          <p>
            At Postal 98 Cafe, we specialize in freshly ground Guatemalan coffee. Enjoy a savory
            breakfast wrap or sandwich along with a steaming hot coffee that is both rich and
            smooth. For lunch or dinner, choose from our selection of specialty paninis, pair it
            with a latte and a tasty dessert for a truly delightful experience.
          </p>
          <p>
            Grab a friend and enjoy our outdoor seating area while savoring a hot or cold beverage
            from our variety of options. We are excited to not only offer you a delicious menu but
            also pass along words of hope and encouragement to this wonderful community.
          </p>
          <p>Come out and see us, we are ready to serve you with a smile!</p>
          <a href="#info" className="btn">
            Visit Us
          </a>
        </div>
        <Picture
          picture={somethingUnique}
          alt="Iced drinks and pastries on the counter at Postal 98 Cafe"
          sizes="(min-width: 1024px) 32vw, 80vw"
          className="w-full lg:col-span-2"
        />
      </div>
    </Section>
  )
}

function Specialties() {
  return (
    <Section title="Specialties" dark>
      <Placeholder className="min-h-120">Specialties gallery</Placeholder>
    </Section>
  )
}

function OtherItems() {
  return (
    <>
      <Section title="Other Items">
        <p className="text-center font-semibold text-lg leading-loose">
          Coffee - Desserts - Specialty Drinks - And Much More
        </p>
      </Section>
      <Section dark>
        <div className="grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {Object.values(otherItems).map((picture) => (
            <Picture
              key={picture.img.src}
              picture={picture}
              alt=""
              sizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 80vw"
              className="h-full border-2 border-paper object-cover"
            />
          ))}
        </div>
      </Section>
    </>
  )
}

export default function Home() {
  return (
    <>
      <Welcome />
      <SomethingUnique />
      <Specialties />
      <WeeklySpecials />
      <OtherItems />
    </>
  )
}
