import { Button } from '../components/Button'
import { FeaturedCard } from '../components/FeaturedCard'
import { Gallery } from '../components/Gallery'
import { Hero } from '../components/Hero'
import { OurInfo } from '../components/OurInfo'
import { Stripe } from '../components/Stripe'
import { WeeklySpecials } from '../components/WeeklySpecials'
import { homeOtherItems } from '../data/galleries'
import { featuredItems } from '../data/menu'
import { site, uploads } from '../data/site'
import { bgUrl, fullUrl, rawUrl } from '../lib/assets'

export function Home() {
  return (
    <>
      <Hero
        eyebrow="Welcome to"
        title={
          <em>
            Postal <span className="text-brand-yellow">98</span>&nbsp;Cafe
          </em>
        }
        subline="A Family Place"
        image={bgUrl(uploads.heroPoster)}
        video={rawUrl(uploads.heroVideo)}
        padding={['9vw', '5vw']}
      >
        <div className="row row-4col pt-[27px]! pb-0! min-h-[229.4px]">
          <div className="col col-1_4 col-empty" />
          <div className="col col-1_4 text-center">
            <Button href={rawUrl(uploads.menuPdf)} external>
              View Menu
            </Button>
          </div>
          <div className="col col-1_4 text-center">
            <Button href={site.links.orderOnline} external>
              Order Online
            </Button>
          </div>
          <div className="col col-1_4 col-empty" />
        </div>
      </Hero>

      {/* Something Unique */}
      <section className="section bg-[#fdfdfd] py-0! pb-px!">
        {/* Container  */}
        <div className="flex flex-row p-4 pt-24 mx-auto justify-around max-lg:flex-col">
          <div className="flex-col justify-left">
            {/* Divi hides this module's content on tablet and phone */}
            <div className="txt mod mt-[-50px] mb-[20px]! max-w-[600px] font-cairo font-semibold text-[18px] leading-[1.8em] max-lg:text-center">
              <h4 className="font-cairo font-bold uppercase text-brand-red tracking-[4px] leading-[1.6em]">
                Est. 2020
              </h4>
              {/* <h1 className="font-outside text-[80px]">Something Unique</h1> */}
              <Stripe title="Something Unique" className="py-0! mt-[8px]! mx-auto" />
            </div>
            <div className="txt mod pb-0! max-w-[600px] font-cairo font-semibold text-[16px] leading-[2em]">
              <h3 className="text-justify">
                At Postal 98 Cafe, we specialize in freshly ground Guatemalan coffee. Enjoy a savory
                breakfast wrap or sandwich along with a steaming hot coffee is that is both rich and
                smooth. For lunch or dinner, choose from our selection of specialty paninis, pair it
                with a latte and a tasty dessert for a truly delightful experience.{' '}
              </h3>
              <h3 className="text-justify">
                Grab a friend and enjoy our outdoor seating area while savoring a hot or cold
                beverage from our variety of options. We are excited to not only offer you a
                delicious menu but also pass along words of hope and encouragement to this wonderful
                community.{' '}
              </h3>
              <h3 className="text-justify">
                Come out and see us, we are ready to serve you with a smile!
              </h3>
            </div>
            <div className="my-[18px]! mx-auto max-lg:text-center">
              <Button href="#info_direction">Visit Us</Button>
            </div>
          </div>
          <div className="max-w-[400px]">
            <img
              src={fullUrl(uploads.somethingUnique)}
              alt=""
              className=" inset-0 h-full w-full object-cover max-lg:static max-lg:h-auto"
            />
          </div>
        </div>
      </section>

      {/* House Specialties */}
      <Stripe title="Specialties" className="py-0! mt-[8px]!" />
      <section className="section chalkboard pt-px! pb-[64px]!">
        <div className="row w-[90%]! max-w-[1180px]! pt-[40px]! pb-0!">
          <div className="txt mx-auto mb-[32px] max-w-[640px] text-center font-cairo font-semibold text-[16px] leading-[1.8em] text-white/70">
            <h4 className="font-cairo font-bold uppercase text-brand-yellow tracking-[4px] leading-[1.6em] text-[14px]">
              House Favorites
            </h4>
            <p>
              The plates and cups our regulars keep coming back for, made fresh to order every day.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-[28px] min-[480px]:grid-cols-2 lg:grid-cols-3">
            {featuredItems().map((item) => (
              <FeaturedCard key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-[44px] flex flex-wrap justify-center gap-x-[20px] gap-y-[6px]">
            <Button to="/menu">View Full Menu</Button>
            <Button href={site.links.orderOnline} external variant="outline">
              Order Online
            </Button>
          </div>
        </div>
      </section>

      <WeeklySpecials variant="home" />

      {/* Other Items */}
      <section className="section bg-white py-0! mt-[5px]! min-h-[166px]">
        <Stripe title="Other Items" className="py-[28px]" />
        <div className="row pt-0! pb-[27px]!">
          <div className="col col-4_4">
            <div className="txt mod mx-auto max-w-[600px] text-center font-cairo font-semibold text-[18px] leading-[1.8em]">
              <p>Coffee – Desserts – Specialty Drinks – And Much More</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section bg-black pt-[2px]! pb-[5px]!">
        <div className="row">
          <div className="col col-4_4">
            <div className="mod">
              <Gallery images={homeOtherItems.images} layout="grid4" interactive={false} />
            </div>
          </div>
        </div>
      </section>

      <OurInfo />
    </>
  )
}
