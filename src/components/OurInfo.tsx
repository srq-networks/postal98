import { Link } from 'react-router'
import { site } from '../data/site'
import { Button } from './Button'
import { Stripe } from './Stripe'

const infoText = 'font-cairo font-semibold text-base leading-[1.8em] text-white/70 max-w-150'
const h3 =
  'font-cairo font-bold uppercase text-lg tracking-[4px] leading-[1.6em] text-white max-lg:text-base'

/** The black "Our Info" section that closes every page (Divi anchor: #info_direction). */
export function OurInfo() {
  return (
    <section id="info_direction" className="section bg-black pb-px!">
      <Stripe dark title="Our Info" className="pt-0! pb-0.75! -mt-1.75!" />
      <div className="row row-1-2_1-4_1-4">
        <div className="col col-1_2">
          <div className="mod">
            <iframe
              title="Postal 98 Cafe"
              src="https://maps.google.com/maps?q=27.3225998,-82.5021878&z=15&output=embed"
              className="block w-full min-h-102.5 border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <div className="col col-1_4">
          <div className={`mod ${infoText}`}>
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
          <div className="mod -mt-6.75!">
            <Button to="/contact#contact_section" variant="outline">
              Email us
            </Button>
          </div>
          <div className={`mod ${infoText}`}>
            <h3 className={h3}>Visit Us</h3>
            <p>
              We are located right off of Bahia Vista Street, between Graber Avenue and Yoder
              Avenue.
            </p>
          </div>
        </div>

        <div className="col col-1_4">
          <div className={`mod ${infoText} leading-[1em]!`}>
            <h3 className={h3}>Store Hours</h3>
          </div>
          <div className={`mod ${infoText} leading-[0.8em]! tracking-[1px]`}>
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
          <div className={`mod ${infoText} leading-[0.8em]! tracking-[1px]`}>
            <h4 className="text-white">
              <strong>All Sundays Closed</strong>
            </h4>
          </div>
          <div className={`mod ${infoText} leading-[0.8em]! tracking-[1px]`}>
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
