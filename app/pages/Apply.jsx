import heroImage from '../assets/hero-contact.jpg'
import { Hero } from '../components/Hero'
import { Placeholder } from '../components/Placeholder'
import { Section } from '../components/Section'

export const meta = () => [
  { title: 'Employment Application | Postal 98 Cafe' },
  {
    name: 'description',
    content: 'Apply to join the team at Postal 98 Cafe in Pinecraft, Sarasota, Florida.',
  },
]

function WorkWithUs() {
  return (
    <Hero
      eyebrow="Work with us"
      title="Apply"
      mustache="Employment application"
      image={heroImage}
    />
  )
}

function JoinOurTeam() {
  return (
    <Section title="Join Our Team">
      <div className="border-4 border-ink p-8 lg:p-12">
        <p className="mx-auto max-w-150 text-center font-semibold leading-loose">
          Fill out the application below and we will be in touch.
        </p>
        <Placeholder className="mt-8 min-h-100">Employment application form</Placeholder>
      </div>
    </Section>
  )
}

export default function Apply() {
  return (
    <>
      <WorkWithUs />
      <JoinOurTeam />
    </>
  )
}
