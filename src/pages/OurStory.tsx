import { lazy, Suspense, useState } from 'react'
import { Hero } from '../components/Hero'
import { OurInfo } from '../components/OurInfo'
import { Picture } from '../components/Picture'
import { Stripe } from '../components/Stripe'
import { Testimonial } from '../components/Testimonial'
import { uploads } from '../data/site'
import { imageUrl } from '../lib/assets'

/** yet-another-react-lightbox (+ its CSS) loaded on demand: mount only while the photo is open. */
/** Divi gutter-2 module spacing; it also trails the last card except on tablet and below. */
const stack = '*:mb-[3.093%] max-lg:*:last:mb-0'

const Lightbox = lazy(async () => {
  await import('yet-another-react-lightbox/styles.css')
  return import('yet-another-react-lightbox')
})

export function OurStory() {
  const [open, setOpen] = useState(false)
  const photo = imageUrl('full', uploads.ourStoryPhoto, 'webp', 1600)

  return (
    <>
      <Hero
        eyebrow="Learn about us"
        title="Post Office to Cafe"
        subline="every cup is made with love"
        image={uploads.ourStoryHero}
        blend="lighten"
      />

      <section className="relative bg-white pt-13.5 pb-5.75 max-lg:pt-12.5">
        <div className="row pt-6.75">
          <div className="mx-auto max-w-150 text-center font-cairo font-semibold text-xl leading-[1.5em]">
            <h4 className="eyebrow text-brand-red max-lg:text-base">Est. 2020</h4>
          </div>
        </div>
        <Stripe title="Our Story" flush />
      </section>

      <section className="relative -my-6.25 bg-white pt-8.25 pb-3.75">
        <div className="row grid min-h-139 grid-cols-2 content-start gap-x-[5.5%] py-6.75 max-lg:grid-cols-1 max-lg:gap-y-7.5 max-lg:py-7.5">
          <div className="pt-12">
            <a
              href={photo}
              onClick={(e) => {
                e.preventDefault()
                setOpen(true)
              }}
              className="group relative block overflow-hidden"
            >
              <Picture
                kind="full"
                src={uploads.ourStoryPhoto}
                className="block w-full"
                width={1600}
                height={1066}
                sizes="(min-width: 981px) 50vw, 100vw"
              />
              <span
                className="absolute inset-0 flex items-center justify-center border border-neutral-200 bg-white/90 font-open text-[32px] leading-none font-light text-brand-yellow opacity-0 transition-all duration-300 group-hover:opacity-100"
                aria-hidden="true"
              >
                +
              </span>
            </a>
            {open && (
              <Suspense fallback={null}>
                <Lightbox open close={() => setOpen(false)} slides={[{ src: photo }]} />
              </Suspense>
            )}
          </div>
          <div className="max-w-150 px-7.5 font-cairo font-semibold text-base leading-[2em] text-justify">
            <p>
              Postal 98’ Café originated from the Pinecraft Post Office. As a young girl, owner, Ann
              Michelle Stoltzfus remembers mailing post cards and letters home to her friends back
              north in Pennsylvania when she would visit with her parents Dave and Barbie Esh. No
              stranger to the food business, Ann Michelle along with her husband Jason are co-owners
              of Esh Foods, located in Lancaster County, PA. Her main highlight of coming to
              Pinecraft was to visit her grandparents, inspiring her love for Florida. When the word
              spread that the post office was closing, her dreams of owning a café finally became a
              reality. Partnering with Sarasota-based Lattitude 23.5˚ Coffee &amp; Tea, they created
              a specialty blend of Guatemala based coffee, as a way of honoring their adopted
              children from Guatemala. This blend is commonly known as their Signature Postal 98’
              Café Blend. Along with the uniqueness of the coffee blend, you’ll find the various
              menu items reflecting their four children’s favorite drinks.
            </p>
            <p>
              Their mission is to create an atmosphere for the community to connect with others and
              above all, reflecting God’s love.
            </p>
          </div>
        </div>
        <Stripe title="Testimonials" flush className="max-md:[&_h1]:text-[50px]" />
      </section>

      <section className="relative border-40 border-white bg-white">
        <div className="relative mt-0.5 overflow-hidden bg-black px-[4vw] pt-[5vw] pb-[3vw]">
          <Picture kind="bg" src={uploads.testimonialsBg} sizes="100vw" className="bg-layer" />
          <div className="relative grid grid-cols-2 gap-x-[3%] max-xs:grid-cols-1 max-xs:gap-y-7.5">
            <div className={stack}>
              <Testimonial
                quote={[
                  'Postal 98 Cafe is the perfect addition to Pinecraft. Service is friendly. Food is quality. Atmosphere is pleasant and location is great. Welcome to the neighborhood.',
                ]}
                author="- SGS"
                justify
              />
              <Testimonial
                quote={[
                  'Love love love this place!!! Best iced coffee · Cheap eats ·Delicious sandwiches · Best coffee · Free Wi-Fi.',
                ]}
                author="- TP"
              />
              <Testimonial
                quote={[
                  'Just spent 10 days in Sarasota and visited Postal 98 Cafe (8) times! Great coffee and food, great service, and friendly staff! A definite must stop if in the area! Highly recommend.',
                ]}
                author="- SG"
              />
            </div>
            <div className={stack}>
              <Testimonial
                quote={['Very clean, good service, great food. I’ll be back for breakfast!']}
                author="- ES"
              />
              <Testimonial
                quote={['Great little place to hang out! ', 'Best coffee']}
                author="- LY"
              />
              <Testimonial
                quote={[
                  'Delicious, high quality sandwiches and coffee served to you by friendly staff. If you are an all day coffee drinker you’ll love the fact that they are open well into the evening. My personal favorites – vanilla latte, caramel latte, sweet bologna sandwich and recently they added Dave’s Special – a warm melted cheesy ham, egg, tomato and mayo concoction on an everything bagel!',
                ]}
                author="- NEG"
                justify
              />
            </div>
          </div>
        </div>
      </section>

      <OurInfo />
    </>
  )
}
