export const meta = () => [
  { title: 'Postal 98 Cafe | A Coffee / Tea / Pastries Shop in Pinecraft Sarasota, FL' },
  {
    name: 'description',
    content:
      'Postal 98 Cafe is a neighborhood coffee, tea and pastry shop in Pinecraft, Sarasota, Florida.',
  },
]

function Hero() {
  return (
    <section>
      <h1>Postal 98 Cafe</h1>
    </section>
  )
}

export default function Home() {
  return <Hero />
}
