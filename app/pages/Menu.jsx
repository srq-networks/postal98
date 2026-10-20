export const meta = () => [
  { title: 'Menu | Postal 98 Cafe' },
  {
    name: 'description',
    content: 'Coffee, tea, pastries and weekly specials at Postal 98 Cafe in Pinecraft, Sarasota.',
  },
]

function Hero() {
  return (
    <section>
      <h1>Menu</h1>
    </section>
  )
}

export default function Menu() {
  return <Hero />
}
