import { type FeaturedItem, formatPrice, startingPrice } from '../data/menu'
import { Picture } from './Picture'

/** Photo card for the home "House Specialties" grid. */
export function FeaturedCard({ item }: { item: FeaturedItem }) {
  const price = startingPrice(item)
  const priceLabel =
    price === undefined ? null : item.sizes ? `from ${formatPrice(price)}` : formatPrice(price)
  return (
    <article className="feature-card">
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
}
