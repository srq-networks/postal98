import heroImage from '../assets/hero-our-story.jpg'
import storyPhoto from '../assets/our-story.jpg'
import { Hero } from '../components/Hero'
import { Icon } from '../components/icons'
import { Section } from '../components/Section'

export const meta = () => [
  { title: 'Our Story | Postal 98 Cafe' },
  {
    name: 'description',
    content:
      'How Postal 98 Cafe came to be, and the people behind the counter in Pinecraft, Sarasota.',
  },
]

function LearnAboutUs() {
  return (
    <Hero
      eyebrow="Learn about us"
      title="Post Office to Cafe"
      mustache="Every cup is made with love"
      image={heroImage}
    />
  )
}

function Story() {
  return (
    <>
      <p className="eyebrow bg-paper pt-16 text-center text-brand">Est. 2020</p>
      <Section title="Our Story">
        <div className="grid items-start gap-10 pt-6 lg:grid-cols-2">
          <img
            src={storyPhoto}
            alt="The Postal 98 Cafe storefront in Pinecraft"
            width={2032}
            height={1354}
            className="w-full"
          />
          <div className="space-y-6 font-semibold leading-loose">
            <p>
              Postal 98' Café originated from the Pinecraft Post Office. As a young girl, owner, Ann
              Michelle Stoltzfus remembers mailing post cards and letters home to her friends back
              north in Pennsylvania when she would visit with her parents Dave and Barbie Esh. No
              stranger to the food business, Ann Michelle along with her husband Jason are co-owners
              of Esh Foods, located in Lancaster County, PA. Her main highlight of coming to
              Pinecraft was to visit her grandparents, inspiring her love for Florida. When the word
              spread that the post office was closing, her dreams of owning a café finally became a
              reality. Partnering with Sarasota-based Lattitude 23.5˚ Coffee &amp; Tea, they created
              a specialty blend of Guatemala based coffee, as a way of honoring their adopted
              children from Guatemala. This blend is commonly known as their Signature Postal 98'
              Café Blend. Along with the uniqueness of the coffee blend, you'll find the various
              menu items reflecting their four children's favorite drinks.
            </p>
            <p>
              Their mission is to create an atmosphere for the community to connect with others and
              above all, reflecting God's love.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}

function Testimonial({ author, children }) {
  return (
    <figure className="relative bg-surface p-8 font-semibold text-muted leading-loose">
      <span
        aria-hidden="true"
        className="absolute -top-4 left-1/2 flex size-8 -translate-x-1/2 items-center justify-center rounded-full bg-surface text-brand"
      >
        <Icon name="format_quote" />
      </span>
      <blockquote>{children}</blockquote>
      <figcaption className="mt-6 font-bold">- {author}</figcaption>
    </figure>
  )
}

function Testimonials() {
  return (
    <Section title="Testimonials" dark>
      <div className="grid gap-10 pt-10 lg:grid-cols-2">
        <Testimonial author="SGS">
          Postal 98 Cafe is the perfect addition to Pinecraft. Service is friendly. Food is quality.
          Atmosphere is pleasant and location is great. Welcome to the neighborhood.
        </Testimonial>
        <Testimonial author="ES">
          Very clean, good service, great food. I'll be back for breakfast!
        </Testimonial>
        <Testimonial author="TP">
          Love love love this place!!! Best iced coffee · Cheap eats · Delicious sandwiches · Best
          coffee · Free Wi-Fi.
        </Testimonial>
        <Testimonial author="LY">Great little place to hang out! Best coffee.</Testimonial>
        <Testimonial author="SG">
          Just spent 10 days in Sarasota and visited Postal 98 Cafe (8) times! Great coffee and
          food, great service, and friendly staff! A definite must stop if in the area! Highly
          recommend.
        </Testimonial>
        <Testimonial author="NEG">
          Delicious, high quality sandwiches and coffee served to you by friendly staff. If you are
          an all day coffee drinker you'll love the fact that they are open well into the evening.
          My personal favorites – vanilla latte, caramel latte, sweet bologna sandwich and recently
          they added Dave's Special – a warm melted cheesy ham, egg, tomato and mayo concoction on
          an everything bagel!
        </Testimonial>
      </div>
    </Section>
  )
}

export default function OurStory() {
  return (
    <>
      <LearnAboutUs />
      <Story />
      <Testimonials />
    </>
  )
}
