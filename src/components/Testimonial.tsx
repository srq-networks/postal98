type Props = { quote: string[]; author: string; justify?: boolean }

export function Testimonial({ quote, author, justify }: Props) {
  return (
    <div className="testimonial mod">
      <div>
        {quote.map((q) => (
          <h4 key={q} className={justify ? 'text-justify' : undefined}>
            {q}
          </h4>
        ))}
      </div>
      <span className="testimonial-author">{author}</span>
    </div>
  )
}
