import { ApplicationForm } from '../components/ApplicationForm'
import { Hero } from '../components/Hero'
import { OurInfo } from '../components/OurInfo'
import { Stripe } from '../components/Stripe'
import { uploads } from '../data/site'
import { rawUrl } from '../lib/assets'

export function Apply() {
  return (
    <>
      <Hero
        eyebrow="Work with us"
        title="Apply"
        subline="Employment application"
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
        <Stripe title="Join Our Team" flush className="py-10" />

        <div className="row border-4 border-ink p-7.5 max-md:p-3.75">
          <div className="mx-auto mb-[2.75%] max-w-150 text-center font-cairo font-semibold text-base leading-[1.8em] max-lg:mb-7.5">
            <p>
              Fill out the application below and we'll be in touch. Prefer paper?{' '}
              <a
                href={rawUrl(uploads.employmentPdf)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-red"
              >
                Download the PDF
              </a>{' '}
              and bring it to the cafe.
            </p>
          </div>
          <ApplicationForm />
        </div>
      </section>

      <OurInfo />
    </>
  )
}
