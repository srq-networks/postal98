import { type FormEvent, useState } from 'react'
import { Button } from './Button'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<string[]>([])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const errs: string[] = []
    if (!name.trim()) errs.push('Name')
    if (!emailOk(email)) errs.push('Email Address')
    if (!message.trim()) errs.push('Message')
    setErrors(errs)
    if (errs.length) return

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, website }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="txt -mt-[10px] font-cairo font-semibold text-[16px] leading-[2em] text-white">
        <p>Thanks for contacting us</p>
      </div>
    )
  }

  return (
    <form className="-mt-[10px]" onSubmit={onSubmit} noValidate>
      {errors.length > 0 && (
        <div className="mb-[3%] font-cairo text-[16px] text-white">
          <p>Please, fill in the following fields:</p>
          <ul className="list-disc pl-[1.5em]">
            {errors.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      )}
      <p className="mb-[3%] !pb-0">
        <label className="sr-only" htmlFor="contact-name">
          Name
        </label>
        <input
          id="contact-name"
          className={`field ${errors.includes('Name') ? 'field-error' : ''}`}
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </p>
      <p className="mb-[3%] !pb-0">
        <label className="sr-only" htmlFor="contact-email">
          Email Address
        </label>
        <input
          id="contact-email"
          className={`field ${errors.includes('Email Address') ? 'field-error' : ''}`}
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </p>
      <p className="mb-[30px] !pb-0">
        <label className="sr-only" htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          className={`field ${errors.includes('Message') ? 'field-error' : ''}`}
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </p>
      <p className="absolute scale-[0.01]" aria-hidden="true">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="border-0 bg-transparent"
        />
      </p>
      <div className="text-right">
        {status === 'error' && (
          <p className="font-cairo text-[16px] text-white">
            Sorry, your message could not be sent. Please call us at 941-260-8862.
          </p>
        )}
        <Button type="submit" disabled={status === 'sending'}>
          Submit
        </Button>
      </div>
    </form>
  )
}
