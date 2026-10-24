import { Link } from 'react-router'
import { site } from '../data/site'
import { FacebookIcon, InstagramIcon } from './icons'
import { Section } from './Section'

const heading = 'eyebrow text-lg text-white'
const social = 'block transition-opacity hover:opacity-70'

function MapEmbed() {
  return (
    <iframe
      title={site.name}
      src={site.mapEmbed}
      className="min-h-100 w-full border-0 lg:col-span-2"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  )
}

function Contact() {
  return (
    <div className="space-y-2">
      <h3 className={heading}>Get in touch</h3>
      <p>
        <strong className="text-white">Phone.</strong>
        <br />
        {site.phone}
      </p>
      <p>
        <strong className="text-white">Address.</strong>
        <br />
        {site.address[0]}
        <br />
        {site.address[1]}
      </p>
      <p>
        <strong className="text-white">Send a message.</strong>
      </p>
      <Link to="/contact" className="btn btn-outline px-3 py-1 text-xs">
        Email us
      </Link>
      <h3 className={heading}>Visit us</h3>
      <p>We are located right off of Bahia Vista Street, between Graber Avenue and Yoder Avenue.</p>
    </div>
  )
}

function Hours() {
  return (
    <div className="space-y-6">
      <h3 className={heading}>Store hours</h3>
      {site.hours.map(({ season, days }) => (
        <p key={season}>
          <strong className="text-white">{season}.</strong>
          {days.map((day) => (
            <span key={day} className="block">
              {day}
            </span>
          ))}
        </p>
      ))}
      <p>
        <strong className="text-white">All Sundays Closed</strong>
      </p>
      <p>
        <strong className="text-white">Employee Application Form</strong>
        <Link to="/apply" target="_blank" rel="noreferrer noopener" className="block">
          Click Here
        </Link>
      </p>
    </div>
  )
}

function Info() {
  return (
    <Section id="info" title="Our Info" dark>
      <div className="grid gap-8 font-semibold lg:grid-cols-4">
        <MapEmbed />
        <Contact />
        <Hours />
      </div>
    </Section>
  )
}

function Credits() {
  return (
    <div className="row flex flex-col-reverse items-center gap-2 py-4 text-sm lg:flex-row lg:justify-between">
      <p>
        &copy; {new Date().getFullYear()} {site.name} · Site made with 💛 by{' '}
        <a href="https://sarasota-networks.com" target="_blank" rel="noreferrer">
          Sarasota Networks
        </a>
      </p>
      <ul className="flex gap-5">
        <li>
          <a
            href={site.links.facebook}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className={social}
          >
            <FacebookIcon />
          </a>
        </li>
        <li>
          <a
            href={site.links.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className={social}
          >
            <InstagramIcon />
          </a>
        </li>
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-charcoal">
      <Info />
      <Credits />
    </footer>
  )
}
