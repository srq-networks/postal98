import { Link } from 'react-router'
import { Button } from '../components/Button'
import { ContactForm } from '../components/ContactForm'
import { Hero } from '../components/Hero'
import { FacebookIcon, InstagramIcon } from '../components/icons'
import { OurInfo } from '../components/OurInfo'
import { Picture } from '../components/Picture'
import { Stripe } from '../components/Stripe'
import { site, uploads } from '../data/site'
import { rawUrl } from '../lib/assets'

const h3 = 'eyebrow text-lg max-lg:text-base'
const infoText = 'max-w-150 font-cairo font-semibold text-base leading-[1.8em] [&_a]:text-brand-red'
/** Half-width panel over a full-bleed photo; content children sit above the photo via `relative`. */
const panel = 'relative overflow-hidden px-15 py-25 max-md:px-5'
const h4Red =
  'font-cairo font-black uppercase text-xs text-brand-red tracking-[4px] leading-[1.6em]'
const social =
  'flex h-8 w-8 items-center justify-center bg-brand-red-hover text-brand-yellow transition-opacity hover:opacity-70'

export function Contact() {
  return (
    <>
      <Hero
        eyebrow="Connect with us"
        title="Contact"
        subline="We look forward to serving you "
        image={uploads.contactHero}
        overlay={0.26}
        sublineSize="15px"
      />

      <section
        className="relative bg-white pt-13.5 pb-32.5"
        style={{
          backgroundImage: `url(${rawUrl(uploads.cornerPattern)})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0px bottom 0px',
        }}
      >
        <Stripe title="Get In Touch" flush className="py-10" />

        <div className="row grid grid-cols-4 gap-x-[5.5%] border-4 border-b-0 border-ink p-7.5 text-center max-lg:grid-cols-2 max-lg:gap-y-7.5 max-md:p-3.75 max-xs:grid-cols-1">
          <div className={infoText}>
            <h3 className={h3}>Call Us</h3>
            <p>
              <a href="#">
                <span>{site.phone}</span>
              </a>
            </p>
          </div>
          <div>
            <div className={infoText}>
              <h3 className={h3}>Follow Us</h3>
            </div>
            <ul className="flex justify-center gap-2 pb-2">
              <li>
                <a
                  href={site.links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={social}
                >
                  <span className="sr-only">Facebook</span>
                  <FacebookIcon size={16} />
                </a>
              </li>
              <li>
                <a
                  href={site.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={social}
                >
                  <span className="sr-only">Instagram</span>
                  <InstagramIcon size={16} />
                </a>
              </li>
            </ul>
          </div>
          <div className={infoText}>
            <h3 className={h3}>Email Us</h3>
            <p>
              <a>Fill the email form below to reach us </a>
            </p>
          </div>
          <div className={infoText}>
            <h3 className={h3}>Employee Application form</h3>
            <p>
              <Link to="/apply">
                <span className="text-brand-red">Apply Online</span>
              </Link>
            </p>
          </div>
        </div>

        <div
          id="contact_section"
          className="row grid grid-cols-2 items-start border-4 border-ink p-7.5 max-lg:grid-cols-1 max-lg:gap-y-7.5 max-md:p-3.75"
        >
          <div className={panel}>
            <Picture kind="bg" src={uploads.chalkboard} sizes="100vw" className="bg-layer" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.21)_0%,rgba(0,0,0,0)_100%)]" />
            <div className="relative text-center font-cairo font-semibold text-lg leading-[2em] text-white/60 max-lg:mb-7.5">
              <h4 className={h4Red}>
                <span className="text-lg">Email Us</span>
              </h4>
            </div>
            <div className="relative">
              <ContactForm />
            </div>
          </div>
          <div className={`${panel} text-center`}>
            <Picture kind="bg" src={uploads.contactVisitBg} sizes="100vw" className="bg-layer" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#ffffff_0%,rgba(255,255,255,0.72)_100%)]" />
            <div className="relative mx-auto mb-5 max-w-150 max-lg:max-w-100 font-cairo font-semibold text-xl leading-[1.6em]">
              <h4 className={h4Red}>
                <span className="text-lg">Visit Us</span>
              </h4>
              <h1 className="font-outside text-[80px] tracking-[-1px] max-md:text-[65px]">
                Come Say Hi
              </h1>
            </div>
            <div className="relative mx-auto font-varela font-bold text-[22px] max-lg:mb-7.5">
              <h2 className="text-center">
                <strong>Store Hours</strong>
              </h2>
              <h5 className="text-center">
                <strong>Scroll down to view our seasonal hours.</strong>
              </h5>
              <p className="text-center" />
            </div>
            <div className="relative mt-10">
              <Button href="#info_direction" variant="black">
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </section>

      <OurInfo />
    </>
  )
}
