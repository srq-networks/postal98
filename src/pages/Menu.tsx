import { Fragment } from 'react'
import { Button } from '../components/Button'
import { Gallery } from '../components/Gallery'
import { Hero } from '../components/Hero'
import { OurInfo } from '../components/OurInfo'
import { Stripe } from '../components/Stripe'
import { WeeklySpecials } from '../components/WeeklySpecials'
import { menuColumns } from '../data/galleries'
import { uploads } from '../data/site'
import { bgUrl, rawUrl } from '../lib/assets'

export function Menu() {
  return (
    <>
      <Hero
        eyebrow="just for you"
        title="Something Delicious For Everyone"
        subline="Favorite Family Flavors"
        image={bgUrl(uploads.menuHero)}
        padding={['6vw', '6vw']}
        titleSize="75px"
        position="center bottom 0px"
        blend="darken"
      />

      <section className="section bg-white !pt-[5px] !pb-[52px]">
        <Stripe title="Our Menu" className="!py-[30px] !mt-[3px]" />
      </section>

      <section className="section bg-black !pt-[31px] !pb-[7px] !-mt-[48px]">
        <div className="row row-full !max-w-[1080px] !pt-[30px] !pb-[3px] min-h-[444px]">
          {menuColumns.map((galleries, c) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static column layout
            <div className="col col-1_3" key={c}>
              {galleries.map((g) => (
                <Fragment key={g.title}>
                  <div className="txt mod !mb-[4px] font-outside leading-[2em] tracking-[2px] text-brand-red">
                    <p>
                      <span className="text-[40px] text-white">{g.title}</span>
                    </p>
                  </div>
                  <div className="mod">
                    <Gallery images={g.images} visible={1} />
                  </div>
                </Fragment>
              ))}
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col col-4_4 text-center">
            <div className="mod !-mt-[16px] !-mb-[3px]">
              <Button href={rawUrl(uploads.fullMenuPdf)} external>
                View Full Menu
              </Button>
            </div>
          </div>
        </div>
      </section>

      <WeeklySpecials variant="menu" />
      <OurInfo />
    </>
  )
}
