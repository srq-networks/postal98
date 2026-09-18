import { useState } from 'react'
import { Hero } from '../components/Hero'
import { Lightbox } from '../components/Lightbox'
import { OurInfo } from '../components/OurInfo'
import { Picture } from '../components/Picture'
import { Stripe } from '../components/Stripe'
import { Testimonial } from '../components/Testimonial'
import { uploads } from '../data/site'
import { storyParagraphs, testimonialColumns } from '../data/story'
import { imageUrl } from '../lib/assets'

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

      <section className="section bg-white !pb-[23px]">
        <div className="row !pt-[27px] !pb-0">
          <div className="col col-4_4">
            <div className="txt mod mx-auto max-w-[600px] text-center font-cairo font-semibold text-[20px] leading-[1.5em]">
              <h4 className="font-cairo font-bold uppercase text-brand-red tracking-[4px] leading-[1.6em] max-lg:text-[16px]">
                Est. 2020
              </h4>
            </div>
          </div>
        </div>
        <Stripe title="Our Story" className="!py-0 [&>.title-band]:!mt-0" />
      </section>

      <section className="section bg-white !pt-[33px] !pb-[15px] !-my-[25px]">
        <div className="row min-h-[556px]">
          <div className="col col-1_2">
            <div className="mod pt-[48px]">
              <a
                href={photo}
                onClick={(e) => {
                  e.preventDefault()
                  setOpen(true)
                }}
                className="gallery-item !border-0"
              >
                <Picture
                  kind="full"
                  src={uploads.ourStoryPhoto}
                  className="w-full"
                  width={1600}
                  height={1066}
                  sizes="(min-width: 981px) 50vw, 100vw"
                />
                <span className="overlay" />
              </a>
              {open && <Lightbox close={() => setOpen(false)} slides={[{ src: photo }]} />}
            </div>
          </div>
          <div className="col col-1_2">
            <div className="txt mod max-w-[600px] px-[30px] font-cairo font-semibold text-[16px] leading-[2em] text-justify">
              {storyParagraphs.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
          </div>
        </div>
        <Stripe
          title="Testimonials"
          className="!py-0 !mt-[7px] [&>.title-band]:!mt-0 max-md:[&_h1]:!text-[50px]"
        />
      </section>

      <section className="section !p-0 border-[40px] border-white bg-white">
        <div className="row row-full row-gutters2 relative overflow-hidden bg-black !mt-[2px] !pt-[5vw] !px-[4vw] !pb-[3vw]">
          <Picture kind="bg" src={uploads.testimonialsBg} sizes="100vw" className="bg-layer" />
          {testimonialColumns.map((column, c) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static column layout
            <div className="col col-1_2" key={c}>
              {column.map((t) => (
                <Testimonial key={t.author} {...t} />
              ))}
            </div>
          ))}
        </div>
      </section>

      <OurInfo />
    </>
  )
}
