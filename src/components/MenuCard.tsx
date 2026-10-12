import type { CSSProperties } from 'react'
import { formatPrice, type MenuSection } from '../data/menu'

const row = 'grid items-baseline'
const plainCols = 'grid-cols-[minmax(0,1fr)_auto] gap-x-3.5'
/** One price column per size; on phones the columns fold into labelled pills under the name. */
const sizedCols =
  'grid-cols-[minmax(0,1fr)_repeat(var(--sizes),4.25rem)] gap-x-1.5 max-md:grid-cols-1 max-md:gap-y-1.5'
const itemRow = 'border-b border-dashed border-white/13 py-2.75 last:border-b-0'
const price = 'whitespace-nowrap text-right font-cairo text-[17px] font-bold leading-[1.35em]'
const sizedPrice =
  'max-md:rounded-full max-md:border max-md:border-brand-yellow/45 max-md:px-2.5 max-md:py-0.5 max-md:text-sm'
const fullWidth = 'col-span-full font-cairo'

/** One chalkboard card per menu section: heading, serving note, size headers, item rows. */
export function MenuCard({ section }: { section: MenuSection }) {
  const { sizes } = section
  const style = sizes ? ({ '--sizes': sizes.length } as CSSProperties) : undefined
  return (
    <section
      className="chalk-frame relative mb-7 break-inside-avoid px-7 pt-6.5 pb-5.5 shadow-[inset_0_0_60px_rgba(0,0,0,0.35)] max-md:px-4.5 max-md:pt-5.5 max-md:pb-4.5"
      aria-labelledby={`menu-${section.id}`}
      style={style}
    >
      <header className="mb-1.5 border-b border-white/15 pb-3.5 text-center">
        <h2
          id={`menu-${section.id}`}
          className="pb-0.5 font-lobster text-4xl leading-[1.1em] tracking-[2px] text-white max-md:text-3xl"
        >
          {section.title}
        </h2>
        {section.note && (
          <p className="font-cairo text-xs font-bold tracking-[3px] text-brand-yellow uppercase">
            {section.note}
          </p>
        )}
      </header>
      {sizes && (
        <div className={`${row} ${sizedCols} pt-2.5 pb-0.5 max-md:hidden`} aria-hidden="true">
          <span />
          {sizes.map((size) => (
            <span
              key={size}
              className="text-right font-cairo text-[11px] font-bold tracking-[2px] text-white/60 uppercase"
            >
              {size}
            </span>
          ))}
        </div>
      )}
      <ul>
        {section.items.map((item) => (
          <li key={item.id} className={`${row} ${sizes ? sizedCols : plainCols} ${itemRow}`}>
            <span
              className={`flex items-baseline font-cairo text-[17px] font-bold leading-[1.35em] text-white after:mx-2 after:min-w-6 after:flex-1 after:-translate-y-1 after:border-b-2 after:border-dotted after:border-white/30 ${sizes ? 'max-md:after:hidden' : ''}`}
            >
              {item.name}
            </span>
            {sizes ? (
              <span className="contents max-md:flex max-md:flex-wrap max-md:gap-1.5">
                {sizes.map((size) => {
                  const amount = item.sizes?.[size]
                  return amount === undefined ? (
                    <span
                      key={size}
                      className={`${price} ${sizedPrice} text-white/25 max-md:hidden`}
                      aria-hidden="true"
                    >
                      —
                    </span>
                  ) : (
                    <span key={size} className={`${price} ${sizedPrice} text-brand-yellow`}>
                      <span className="mr-1.25 hidden text-[11px] tracking-[1px] text-white/60 uppercase max-md:inline">
                        {size}
                      </span>
                      {formatPrice(amount)}
                    </span>
                  )
                })}
              </span>
            ) : (
              item.price !== undefined && (
                <span className={`${price} text-brand-yellow`}>{formatPrice(item.price)}</span>
              )
            )}
            {item.description && (
              <p
                className={`${fullWidth} pt-0.75 text-sm font-medium leading-[1.6em] text-white/68`}
              >
                {item.description}
              </p>
            )}
            {item.choices && (
              <ul className="col-span-full flex flex-wrap gap-1.5 pt-2" aria-label="Flavors">
                {item.choices.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-white/25 px-2.5 py-0.5 font-cairo text-xs font-semibold tracking-[1px] text-white/85 uppercase"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            )}
            {item.note && (
              <p
                className={`${fullWidth} pt-0.5 text-[12.5px] font-semibold italic tracking-[0.5px] text-white/50`}
              >
                {item.note}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
