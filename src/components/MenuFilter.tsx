import type { MenuCategory } from '../data/menu'

export const ALL = 'all'

type Props = {
  categories: MenuCategory[]
  selected: string
  onSelect: (id: string) => void
}

/** Category pills. Toggling only swaps the rendered cards; the viewport is never scrolled. */
export function MenuFilter({ categories, selected, onSelect }: Props) {
  const pills = [{ id: ALL, title: 'All' }, ...categories]
  return (
    <fieldset className="flex flex-wrap justify-center gap-x-2.5 gap-y-2">
      <legend className="sr-only">Filter the menu by category</legend>
      {pills.map((p) => (
        <button
          key={p.id}
          type="button"
          className="cursor-pointer rounded-full border border-white/35 bg-white/4 px-4.5 py-2 font-cairo text-[13px] font-bold leading-[1.4em] tracking-[2px] text-white uppercase transition-colors duration-200 hover:border-brand-yellow hover:text-brand-yellow focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand-yellow aria-pressed:border-brand-red aria-pressed:bg-brand-red aria-pressed:text-white"
          aria-pressed={selected === p.id}
          onClick={() => onSelect(p.id)}
        >
          {p.title}
        </button>
      ))}
    </fieldset>
  )
}
