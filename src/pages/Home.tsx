import { Button } from '../components/Button'
import { Hero } from '../components/Hero'
import { OurInfo } from '../components/OurInfo'
import { Picture } from '../components/Picture'
import { Stripe } from '../components/Stripe'
import { WeeklySpecials } from '../components/WeeklySpecials'
import { homeOtherItems } from '../data/galleries'
import { featuredItems, formatPrice } from '../data/menu'
import { site, uploads } from '../data/site'
import { rawUrl } from '../lib/assets'

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
        image={uploads.heroPoster}
        video={rawUrl(uploads.heroVideo)}
        padding={['9vw', '5vw']}
      >
        <div className="row row-4col pt-6.75! pb-0! min-h-[229.4px]">
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
            <div className="mod -mt-12.5 mb-5! max-w-150 font-cairo font-semibold text-lg leading-[1.8em] max-lg:text-center">
              <h4 className="font-cairo font-bold uppercase text-brand-red tracking-[4px] leading-[1.6em]">
                Est. 2020
              </h4>
              {/* <h1 className="font-outside text-[80px]">Something Unique</h1> */}
              <Stripe title="Something Unique" className="py-0! mt-2! mx-auto" />
            </div>
            <div className="mod pb-0! max-w-150 font-cairo font-semibold text-base leading-[2em]">
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
            <div className="my-4.5! mx-auto max-lg:text-center">
              <Button href="#info_direction">Visit Us</Button>
            </div>
          </div>
          <div className="max-w-100">
            <Picture
              kind="full"
              src={uploads.somethingUnique}
              width={1446}
              height={1446}
              sizes="(min-width: 1024px) 400px, 100vw"
              className="inset-0 h-full w-full object-cover max-lg:static max-lg:h-auto"
            />
          </div>
        </div>
      </section>

      {/* House Specialties */}
      <Stripe title="Specialties" className="py-0! mt-2!" />
      <section className="section chalkboard pt-px! pb-16!">
        <div className="row w-9/10! max-w-295! pt-10! pb-0!">
          <div className=" mx-auto mb-8 max-w-160 text-center font-cairo font-semibold text-base leading-[1.8em] text-white/70">
            <h4 className="font-cairo font-bold uppercase text-brand-yellow tracking-[4px] leading-[1.6em] text-sm">
              House Favorites
            </h4>
            <p>
              The plates and cups our regulars keep coming back for, made fresh to order every day.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-7 xs:grid-cols-2 lg:grid-cols-3">
            {featuredItems().map((item) => {
              const price =
                item.price ?? (item.sizes ? Math.min(...Object.values(item.sizes)) : undefined)
              const priceLabel =
                price === undefined
                  ? null
                  : item.sizes
                    ? `from ${formatPrice(price)}`
                    : formatPrice(price)
              return (
                <article key={item.id} className="feature-card">
                  {item.photo && (
                    <Picture
                      kind="cards"
                      src={item.photo}
                      alt={item.name}
                      width={800}
                      height={600}
                      sizes="(min-width: 1024px) 380px, (min-width: 480px) 50vw, 100vw"
                    />
                  )}
                  <div className="feature-body">
                    <p className="feature-kicker">{item.section.title}</p>
                    <div className="feature-title">
                      <h3>{item.name}</h3>
                      {priceLabel && <span className="feature-price">{priceLabel}</span>}
                    </div>
                    {item.description && <p className="feature-desc">{item.description}</p>}
                  </div>
                </article>
              )
            })}
          </div>
          <div className="mt-11 flex flex-wrap justify-center gap-x-5 gap-y-1.5">
            <Button to="/menu">View Full Menu</Button>
            <Button href={site.links.orderOnline} external variant="outline">
              Order Online
            </Button>
          </div>
        </div>
      </section>

      <WeeklySpecials variant="home" />

      {/* Other Items */}
      <section className="section bg-white py-0! mt-1.25! min-h-41.5">
        <Stripe title="Other Items" className="py-7" />
        <div className="row pt-0! pb-6.75!">
          <div className="col col-4_4">
            <div className=" mod mx-auto max-w-150 text-center font-cairo font-semibold text-lg leading-[1.8em]">
              <p>Coffee – Desserts – Specialty Drinks – And Much More</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section bg-black pt-0.5! pb-1.25!">
        <div className="row">
          <div className="col col-4_4">
            <div className="mod">
              <div className="gallery-grid4 gallery-static">
                {homeOtherItems.images.map((img) => (
                  <div key={img} className="gallery-item">
                    <Picture kind="thumbs" src={img} width={400} height={516} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <OurInfo />
    </>
  )
}
