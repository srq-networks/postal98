import { Link } from 'react-router'
import heroImage from '../assets/hero-contact.jpg?hero'
import { Hero } from '../components/Hero'
import { FacebookIcon, InstagramIcon } from '../components/icons'
import { Section } from '../components/Section'
import { site } from '../data/site'

export const meta = () => [
  { title: 'Contact | Postal 98 Cafe' },
  {
    name: 'description',
    content:
      'Hours, location and a contact form for Postal 98 Cafe in Pinecraft, Sarasota, Florida.',
  },
]

const heading = 'eyebrow text-lg'
const social =
  'flex size-8 items-center justify-center bg-brand text-accent transition-opacity hover:opacity-70'

function ConnectWithUs() {
  return (
    <Hero
      eyebrow="Connect with us"
      title="Contact"
      mustache="We look forward to serving you"
      image={heroImage}
    />
  )
}

function GetInTouch() {
  return (
    <Section title="Get In Touch">
      <div className="grid gap-8 border-4 border-ink border-b-0 p-8 text-center font-semibold leading-loose md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className={heading}>Call Us</h3>
          <a href={`tel:${site.phone}`} className="text-brand">
            {site.phone}
          </a>
        </div>
        <div>
          <h3 className={heading}>Follow Us</h3>
          <div className="flex justify-center gap-2 pt-2">
            <a href={site.links.facebook} target="_blank" rel="noreferrer" className={social}>
              <span className="sr-only">Facebook</span>
              <FacebookIcon size={16} />
            </a>
            <a href={site.links.instagram} target="_blank" rel="noreferrer" className={social}>
              <span className="sr-only">Instagram</span>
              <InstagramIcon size={16} />
            </a>
          </div>
        </div>
        <div>
          <h3 className={heading}>Email Us</h3>
          <p>Fill out the form below to reach us</p>
        </div>
        <div>
          <h3 className={heading}>Employee Application</h3>
          <Link to="/apply" className="text-brand">
            Apply Online
          </Link>
        </div>
      </div>
      <div className="grid border-4 border-ink lg:grid-cols-2">
        <EmailUs />
        <VisitUs />
      </div>
    </Section>
  )
}

function EmailUs() {
  return (
    <div className="bg-black px-8 py-16 text-center lg:px-16">
      <p className="eyebrow text-accent">Email Us</p>
      <form className="mt-8 space-y-6 text-left">
        <input className="field" name="name" placeholder="Name" required />
        <input className="field" type="email" name="email" placeholder="Email Address" required />
        <textarea className="field" name="message" placeholder="Message" required />
        <button type="submit" className="btn btn-outline">
          Submit
        </button>
      </form>
    </div>
  )
}

function VisitUs() {
  return (
    <div className="bg-surface px-8 py-16 text-center font-semibold leading-loose lg:px-16">
      <p className="eyebrow text-brand">Visit Us</p>
      <h2 className="text-7xl max-md:text-5xl">Come Say Hi</h2>
      <p className="mt-6 text-ink text-xl">Store Hours</p>
      <p>Scroll down to view our seasonal hours.</p>
      <a href="#info" className="btn mt-10">
        Get Directions
      </a>
    </div>
  )
}

export default function Contact() {
  return (
    <>
      <ConnectWithUs />
      <GetInTouch />
    </>
  )
}
