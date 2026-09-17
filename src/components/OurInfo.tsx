import { Fragment } from 'react'
import { Link } from 'react-router'
import { site } from '../data/site'
import { Button } from './Button'
import { Stripe } from './Stripe'

const mapSrc = `https://maps.google.com/maps?q=${site.map.lat},${site.map.lng}&z=${site.map.zoom}&output=embed`

const infoText =
  'txt font-cairo font-semibold text-[16px] leading-[1.8em] text-white/70 max-w-[600px]'
const h3 =
  'font-cairo font-bold uppercase text-[18px] tracking-[4px] leading-[1.6em] text-white max-lg:text-[16px]'

/** The black "Our Info" section that closes every page (Divi anchor: #info_direction). */
export function OurInfo() {
  return (
    <section id="info_direction" className="section bg-black !pb-[1px]">
      <Stripe dark title="Our Info" className="!pt-0 !pb-[3px] !-mt-[7px]" />
      <div className="row row-1-2_1-4_1-4">
        <div className="col col-1_2">
          <div className="mod">
            <iframe
              title="Postal 98 Cafe"
              src={mapSrc}
              className="block w-full min-h-[410px] border-0"
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
              {site.address[0]}
              <br />
              {site.address[1]}
            </p>
            <h5 className="text-white">
              <strong />
            </h5>
            <h5 className="text-white">
              <strong>Send a message.</strong>
            </h5>
          </div>
          <div className="mod !-mt-[27px]">
            <Button to="/contact#contact_section" variant="outline">
              Email us
            </Button>
          </div>
          <div className={`mod ${infoText}`}>
            <h3 className={h3}>Visit Us</h3>
            <p>{site.directions}</p>
          </div>
        </div>

        <div className="col col-1_4">
          <div className={`mod ${infoText} !leading-[1em]`}>
            <h3 className={h3}>Store Hours</h3>
          </div>
          <div className={`mod ${infoText} !leading-[0.8em] tracking-[1px]`}>
            <h4 className="text-white">
              <strong />
            </h4>
            {site.hours.map((h) => (
              <Fragment key={h.season}>
                <h4 className="text-white">
                  <strong>{h.season}</strong>
                </h4>
                {h.lines.map((l) => (
                  <p key={l}>{l}</p>
                ))}
              </Fragment>
            ))}
            <p>&nbsp;</p>
            <p>&nbsp;</p>
          </div>
          <div className={`mod ${infoText} !leading-[0.8em] tracking-[1px]`}>
            <h4 className="text-white">
              <strong>{site.sundays}</strong>
            </h4>
          </div>
          <div className={`mod ${infoText} !leading-[0.8em] tracking-[1px]`}>
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
