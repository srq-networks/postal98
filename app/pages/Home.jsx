import { Link } from 'react-router'
import heroImage from '../assets/hero-home.png'
import { Hero } from '../components/Hero'
import { site } from '../data/site'

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
          Postal <span className="text-accent">98</span> Cafe
        </>
      }
      mustache="A Family Place"
      image={heroImage}
      video="/hero-home.mp4"
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

export default function Home() {
  return <Welcome />
}
