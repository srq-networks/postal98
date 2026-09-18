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
        className="section bg-white !pt-[54px] !pb-[130px]"
        style={{
          backgroundImage: `url(${rawUrl(uploads.cornerPattern)})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0px bottom 0px',
        }}
      >
        <Stripe title="Join Our Team" className="!py-[40px] [&>.title-band]:!mt-0" />

        <div className="row !p-[30px] border-[4px] border-ink max-md:!p-[15px]">
          <div className="col col-4_4">
            <div className="txt mod mx-auto max-w-[600px] text-center font-cairo font-semibold text-[16px] leading-[1.8em]">
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
            <div className="mod">
              <ApplicationForm />
            </div>
          </div>
        </div>
      </section>

      <OurInfo />
    </>
  )
}
