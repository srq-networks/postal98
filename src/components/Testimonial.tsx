type Props = { quote: string[]; author: string; justify?: boolean }

export function Testimonial({ quote, author, justify }: Props) {
  return (
    <div className="relative bg-card p-7.5">
      <svg
        viewBox="0 0 32 32"
        className="absolute -top-4 left-1/2 -ml-4 size-8 rounded-full bg-card fill-[#9a000e] p-1.5"
        aria-hidden="true"
      >
        <path d="M14 8v7.5c0 4.5-2.4 7.4-6.9 8.5l-.9-1.9c2.3-.8 3.6-2.4 3.9-4.6H7V8h7zm11 0v7.5c0 4.5-2.4 7.4-6.9 8.5l-.9-1.9c2.3-.8 3.6-2.4 3.9-4.6H18V8h7z" />
      </svg>
      <div>
        {quote.map((q) => (
          <h4 key={q} className={justify ? 'text-justify' : undefined}>
            {q}
          </h4>
        ))}
      </div>
      <span className="mt-8 block font-bold">{author}</span>
    </div>
  )
}
