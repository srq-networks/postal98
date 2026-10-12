import { Link } from 'react-router'
import { site } from '../data/site'
import { Button } from './Button'
import { Stripe } from './Stripe'

const infoText = 'max-w-150 font-cairo font-semibold text-base text-white/70'
const hours = `${infoText} leading-[0.8em] tracking-[1px]`
const h3 = 'eyebrow text-lg text-white max-lg:text-base'
/** Divi module spacing: 2.75% of the row, expressed against a quarter-width column. */
const stack = 'space-y-[13.174%] max-lg:space-y-7.5'

/** The black "Our Info" section that closes every page (Divi anchor: #info_direction). */
export function OurInfo() {
  return (
    <section id="info_direction" className="relative bg-black pt-13.5 pb-px max-lg:pt-12.5">
      <Stripe dark title="Our Info" className="-mt-1.75 pb-0.75" />
      <div className="row grid grid-cols-4 gap-x-[5.5%] py-6.75 max-lg:grid-cols-2 max-lg:gap-y-7.5 max-lg:py-7.5 max-xs:grid-cols-1">
        <div className="col-span-2 max-xs:col-span-1">
          <iframe
            title="Postal 98 Cafe"
            src="https://maps.google.com/maps?q=27.3225998,-82.5021878&z=15&output=embed"
            className="block w-full min-h-102.5 border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div className={stack}>
          <div className={`${infoText} leading-[1.8em]`}>
            <h3 className={h3}>Get IN touch</h3>
            <p>
              <strong className="text-white">Phone.</strong>
              <br />
              {site.phone}
            </p>
            <p>
              <strong className="text-white">Address.</strong>
              <br />
              1240 Yoder Ave.
              <br />
              Sarasota, Florida 34239
            </p>
            <h5 className="text-white">
              <strong />
            </h5>
            <h5 className="text-white">
              <strong>Send a message.</strong>
            </h5>
          </div>
          <div className="-mt-6.75">
            <Button to="/contact#contact_section" variant="outline">
              Email us
            </Button>
          </div>
          <div className={`${infoText} leading-[1.8em]`}>
            <h3 className={h3}>Visit Us</h3>
            <p>
              We are located right off of Bahia Vista Street, between Graber Avenue and Yoder
              Avenue.
            </p>
          </div>
        </div>

        <div className={stack}>
          <div className={`${infoText} leading-[1em]`}>
            <h3 className={h3}>Store Hours</h3>
          </div>
          <div className={hours}>
            <h4 className="text-white">
              <strong />
            </h4>
            <h4 className="text-white">
              <strong>April -Oct .</strong>
            </h4>
            <p>Mon-Thu: 7am-3pm</p>
            <p>Fri &amp; Sat: 7am-9pm</p>
            <h4 className="text-white">
              <strong>Nov - Dec 20 .</strong>
            </h4>
            <p>Mon-Sat: 7am-9pm</p>
            <h4 className="text-white">
              <strong>Dec 21 - March .</strong>
            </h4>
            <p>Mon-Sat: 7am-10pm</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
          </div>
          <div className={hours}>
            <h4 className="text-white">
              <strong>All Sundays Closed</strong>
            </h4>
          </div>
          <div className={hours}>
            <h4 className="text-white">
              <strong>
                <Link to="/apply">Apply Now</Link>
              </strong>
            </h4>
          </div>
        </div>
      </div>
    </section>
  )
}
