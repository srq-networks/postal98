import type { CSSProperties } from 'react'
import { formatPrice, type MenuItem, type MenuSection, type Size } from '../data/menu'

type RowProps = { item: MenuItem; sizes?: Size[] }

function MenuRow({ item, sizes }: RowProps) {
  return (
    <li className={`menu-row ${sizes ? 'menu-row-sized' : ''}`.trim()}>
      <span className="menu-name">{item.name}</span>
      {sizes ? (
        <span className="menu-prices">
          {sizes.map((size) => {
            const price = item.sizes?.[size]
            return price === undefined ? (
              <span key={size} className="menu-price menu-price-empty" aria-hidden="true">
                —
              </span>
            ) : (
              <span key={size} className="menu-price">
                <span className="menu-price-size">{size}</span>
                {formatPrice(price)}
              </span>
            )
          })}
        </span>
      ) : (
        item.price !== undefined && <span className="menu-price">{formatPrice(item.price)}</span>
      )}
      {item.description && <p className="menu-desc">{item.description}</p>}
      {item.choices && (
        <ul className="menu-chips" aria-label="Flavors">
          {item.choices.map((c) => (
            <li key={c} className="menu-chip">
              {c}
            </li>
          ))}
        </ul>
      )}
      {item.note && <p className="menu-note">{item.note}</p>}
    </li>
  )
}

/** One chalkboard card per menu section: heading, serving note, size headers, item rows. */
export function MenuCard({ section }: { section: MenuSection }) {
  const { sizes } = section
  const style = sizes ? ({ '--sizes': sizes.length } as CSSProperties) : undefined
  return (
    <section className="menu-card" aria-labelledby={`menu-${section.id}`} style={style}>
      <header className="menu-card-head">
        <h2 id={`menu-${section.id}`}>{section.title}</h2>
        {section.note && <p className="menu-card-note">{section.note}</p>}
      </header>
      {sizes && (
        <div className="menu-row menu-row-sized menu-sizes" aria-hidden="true">
          <span />
          {sizes.map((size) => (
            <span key={size} className="menu-size">
              {size}
            </span>
          ))}
        </div>
      )}
      <ul>
        {section.items.map((item) => (
          <MenuRow key={item.id} item={item} sizes={sizes} />
        ))}
      </ul>
    </section>
  )
}
