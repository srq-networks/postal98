import { type SubmitEvent, useState } from 'react'
import { Button } from './Button'

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errors, setErrors] = useState<string[]>([])

  async function onSubmit(e: SubmitEvent) {
    e.preventDefault()
    const errs: string[] = []
    if (!name.trim()) errs.push('Name')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.push('Email Address')
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
      <div className="mt-2.5 font-cairo font-semibold text-base leading-[2em] text-white">
        <p>Thanks for contacting us</p>
      </div>
    )
  }

  return (
    <form className="-mt-2.5" onSubmit={onSubmit} noValidate>
      {errors.length > 0 && (
        <div className="mb-[3%] font-cairo text-base text-white">
          <p>Please, fill in the following fields:</p>
          <ul className="list-disc pl-[1.5em]">
            {errors.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      )}
      <p className="mb-[3%] pb-0">
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
      <p className="mb-[3%] pb-0">
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
      <p className="mb-7.5 pb-0">
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
      <p className="absolute scale-1" aria-hidden="true">
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
          <p className="font-cairo text-base text-white">
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
