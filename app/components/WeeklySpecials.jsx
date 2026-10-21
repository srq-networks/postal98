import { site } from '../data/site'
import { Section } from './Section'

export function WeeklySpecials() {
  return (
    <Section title="Weekly Specials">
      <div className="mx-auto max-w-150 space-y-10 text-center font-semibold text-lg leading-loose">
        <p>Please visit our social media pages to view our weekly specials!</p>
        <div className="flex flex-wrap justify-center gap-6 lg:gap-24">
          <a href={site.links.facebook} target="_blank" rel="noreferrer" className="btn">
            Facebook
          </a>
          <a href={site.links.instagram} target="_blank" rel="noreferrer" className="btn">
            Instagram
          </a>
        </div>
      </div>
    </Section>
  )
}
