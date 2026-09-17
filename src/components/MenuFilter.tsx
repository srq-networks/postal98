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
    <fieldset className="menu-filter">
      <legend className="sr-only">Filter the menu by category</legend>
      {pills.map((p) => (
        <button
          key={p.id}
          type="button"
          className="menu-pill"
          aria-pressed={selected === p.id}
          onClick={() => onSelect(p.id)}
        >
          {p.title}
        </button>
      ))}
    </fieldset>
  )
}
