export const meta = () => [
  { title: 'Our Story | Postal 98 Cafe' },
  {
    name: 'description',
    content:
      'How Postal 98 Cafe came to be, and the people behind the counter in Pinecraft, Sarasota.',
  },
]

function Hero() {
  return (
    <section>
      <h1>Our Story</h1>
    </section>
  )
}

export default function OurStory() {
  return <Hero />
}
