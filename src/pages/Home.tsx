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
        <div className="row z-1 grid min-h-[229.4px] grid-cols-4 gap-x-[5.5%] pt-6.75 max-lg:grid-cols-2 max-xs:grid-cols-1 max-xs:gap-y-7.5">
          <div className="col-start-2 text-center max-lg:col-start-auto">
            <Button href={rawUrl(uploads.menuPdf)} external>
              View Menu
            </Button>
          </div>
          <div className="text-center">
            <Button href={site.links.orderOnline} external>
              Order Online
            </Button>
          </div>
        </div>
      </Hero>

      {/* Something Unique */}
      <section className="relative bg-paper pb-px">
        {/* Container  */}
        <div className="flex flex-row p-4 pt-24 mx-auto justify-around max-lg:flex-col">
          <div className="flex-col justify-left">
            {/* Divi hides this module's content on tablet and phone */}
            <div className="-mt-12.5 mb-5 max-w-150 font-cairo font-semibold text-lg leading-[1.8em] max-lg:text-center">
              <h4 className="eyebrow text-brand-red">Est. 2020</h4>
              {/* <h1 className="font-outside text-[80px]">Something Unique</h1> */}
              <Stripe title="Something Unique" className="mt-2" />
            </div>
            <div className="max-w-150 font-cairo font-semibold text-base leading-[2em]">
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
            <div className="mx-auto my-4.5 max-lg:text-center">
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
      <Stripe title="Specialties" className="mt-2" />
      <section className="chalkboard relative pt-px pb-16">
        <div className="relative mx-auto w-9/10 max-w-295 pt-10">
          <div className="mx-auto mb-8 max-w-160 text-center font-cairo font-semibold text-base leading-[1.8em] text-white/70">
            <h4 className="eyebrow text-sm text-brand-yellow">House Favorites</h4>
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
                <article key={item.id} className="chalk-frame flex h-full flex-col">
                  {item.photo && (
                    <Picture
                      kind="cards"
                      src={item.photo}
                      alt={item.name}
                      width={800}
                      height={600}
                      sizes="(min-width: 1024px) 380px, (min-width: 480px) 50vw, 100vw"
                      className="block aspect-4/3 w-full object-cover"
                    />
                  )}
                  <div className="flex flex-1 flex-col gap-1.5 px-5.5 pt-4.5 pb-6">
                    <p className="font-cairo text-[11px] font-bold tracking-[3px] text-brand-yellow uppercase">
                      {item.section.title}
                    </p>
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="pb-0 font-outside text-[26px] leading-[1.2em] tracking-[1px] text-white">
                        {item.name}
                      </h3>
                      {priceLabel && (
                        <span className="shrink-0 whitespace-nowrap font-cairo text-[17px] font-extrabold text-brand-yellow">
                          {priceLabel}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="font-cairo text-sm font-medium leading-[1.6em] text-white/70">
                        {item.description}
                      </p>
                    )}
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
      <section className="relative mt-1.25 min-h-41.5 bg-white">
        <Stripe title="Other Items" className="py-7" />
        <div className="row pb-6.75">
          <div className="mx-auto max-w-150 text-center font-cairo font-semibold text-lg leading-[1.8em]">
            <p>Coffee – Desserts – Specialty Drinks – And Much More</p>
          </div>
        </div>
      </section>
      <section className="relative bg-black pt-0.5 pb-1.25">
        <div className="row py-6.75 max-lg:py-7.5">
          <div className="pointer-events-none -mb-[5.5%] flex flex-wrap gap-x-[5.5%] max-lg:mb-0">
            {homeOtherItems.images.map((img) => (
              <div
                key={img}
                className="relative mb-[5.5%] w-[20.875%] overflow-hidden border-2 border-paper max-lg:mb-[7.5%] max-lg:w-[29.666%] max-md:mb-[9.5%] max-md:w-[47.25%] max-xs:mb-[11.5%] max-xs:w-full"
              >
                <Picture
                  kind="thumbs"
                  src={img}
                  width={400}
                  height={516}
                  className="block w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <OurInfo />
    </>
  )
}
