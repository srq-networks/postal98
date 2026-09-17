import { Link } from 'react-router'
import { Button } from '../components/Button'
import { ContactForm } from '../components/ContactForm'
import { Hero } from '../components/Hero'
import { FacebookIcon, InstagramIcon } from '../components/icons'
import { OurInfo } from '../components/OurInfo'
import { Stripe } from '../components/Stripe'
import { site, uploads } from '../data/site'
import { bgUrl, rawUrl } from '../lib/assets'

const h3 =
  'font-cairo font-bold uppercase text-[18px] tracking-[4px] leading-[1.6em] max-lg:text-[16px]'
const infoText =
  'txt mod max-w-[600px] font-cairo font-semibold text-[16px] leading-[1.8em] [&_a]:text-brand-red'
const h4Red =
  'font-cairo font-black uppercase text-[12px] text-brand-red tracking-[4px] leading-[1.6em]'
const social =
  'flex h-[32px] w-[32px] items-center justify-center bg-brand-red-hover text-brand-yellow transition-opacity hover:opacity-70'

export function Contact() {
  return (
    <>
      <Hero
        eyebrow="Connect with us"
        title="Contact"
        subline="We look forward to serving you "
        image={bgUrl(uploads.contactHero)}
        overlay={0.26}
        sublineSize="15px"
      />

      <section
        className="section bg-white !pt-[54px] !pb-[130px]"
        style={{
          backgroundImage: `url(${rawUrl(uploads.cornerPattern)})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0px bottom 0px',
        }}
      >
        <Stripe title="Get In Touch" className="!py-[40px] [&>.title-band]:!mt-0" />

        <div className="row row-4col !p-[30px] border-[4px] border-b-0 border-ink text-center max-lg:border-b-0 max-md:!p-[15px]">
          <div className="col col-1_4">
            <div className={infoText}>
              <h3 className={h3}>Call Us</h3>
              <p>
                <a href="#">
                  <span>{site.phone}</span>
                </a>
              </p>
            </div>
          </div>
          <div className="col col-1_4">
            <div className={`${infoText} !mb-0`}>
              <h3 className={h3}>Follow Us</h3>
            </div>
            <ul className="mod flex justify-center gap-[8px] pb-[8px]">
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
          <div className="col col-1_4">
            <div className={infoText}>
              <h3 className={h3}>Email Us</h3>
              <p>
                <a>Fill the email form below to reach us </a>
              </p>
            </div>
          </div>
          <div className="col col-1_4">
            <div className={infoText}>
              <h3 className={h3}>Employee Application form</h3>
              <p>
                <Link to="/apply">
                  <span className="text-brand-red">Apply Online</span>
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div
          id="contact_section"
          className="row !p-[30px] border-[4px] border-ink max-md:!p-[15px]"
        >
          <div
            className="col !w-1/2 !mr-0 max-lg:!w-full px-[60px] py-[100px] max-md:px-[20px] bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(120deg, rgba(255,255,255,0.21) 0%, rgba(0,0,0,0) 100%), url(${bgUrl(uploads.chalkboard)})`,
            }}
          >
            <div className="txt mod text-center font-cairo font-semibold text-[18px] leading-[2em] text-white/60">
              <h4 className={h4Red}>
                <span className="text-[18px]">Email Us</span>
              </h4>
            </div>
            <div className="mod">
              <ContactForm />
            </div>
          </div>
          <div
            className="col !w-1/2 !mr-0 max-lg:!w-full px-[60px] py-[100px] max-md:px-[20px] bg-cover bg-center text-center"
            style={{
              backgroundImage: `linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0.72) 100%), url(${bgUrl(uploads.contactVisitBg)})`,
            }}
          >
            <div className="txt mod !mb-[20px] mx-auto max-w-[600px] max-lg:max-w-[400px] font-cairo font-semibold text-[20px] leading-[1.6em]">
              <h4 className={h4Red}>
                <span className="text-[18px]">Visit Us</span>
              </h4>
              <h1 className="font-outside text-[80px] tracking-[-1px] max-md:text-[65px]">
                Come Say Hi
              </h1>
            </div>
            <div className="txt mod mx-auto font-varela font-bold text-[22px]">
              <h2 className="text-center">
                <strong>Store Hours</strong>
              </h2>
              <h5 className="text-center">
                <strong>Scroll down to view our seasonal hours.</strong>
              </h5>
              <p className="text-center" />
            </div>
            <div className="mod !mt-[40px]">
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
