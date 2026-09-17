import {
  type ChangeEvent,
  createContext,
  type ReactNode,
  type SubmitEvent,
  useContext,
  useMemo,
  useState,
} from 'react'
import { site, uploads } from '../data/site'
import { rawUrl } from '../lib/assets'
import { Button } from './Button'

// Web version of the paper employment application (public/assets/raw/Postal-Employment-Application.pdf).
// Fields are uncontrolled: the form's `name`s are the payload keys the API expects
// (see server/contact-api.mjs, APPLICATION_SECTIONS). The SSN line of the paper form
// is deliberately not collected.

type Status = 'idle' | 'sending' | 'sent' | 'error'
type Missing = { name: string; label: string }
type Cols = 1 | 2 | 3 | 4 | 5 | 6

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

/** Names of the fields that failed validation, so each field can flag itself. */
const ErrorsContext = createContext<ReadonlySet<string>>(new Set())

const colSpan: Record<Cols, string> = {
  1: 'md:col-span-1',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
  5: 'md:col-span-5',
  6: 'md:col-span-6',
}
const labelClass = 'block font-cairo font-bold uppercase text-[11px] tracking-[2px] text-ink'
const noteClass = 'md:col-span-6 pb-0 font-cairo font-semibold italic text-[15px] text-ink'

const yesNo = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]
const sources = [
  'Advertisement',
  'Employment Agency',
  'Friend',
  'Relative',
  'Walk-in',
  'Other',
].map((s) => ({ value: s, label: s }))
const education = [
  { prefix: 'edu0', level: 'High School', credential: 'Diploma' },
  { prefix: 'edu1', level: 'College', credential: 'Degree' },
  { prefix: 'edu2', level: 'Other', credential: 'Degree' },
]

const Required = () => <span className="text-brand-red"> *</span>

/** Section bar, like the grey bands on the paper form. */
function Band({ children }: { children: ReactNode }) {
  return (
    <h2 className="md:col-span-6 mt-[20px] bg-ink py-[8px] text-center font-cairo font-bold uppercase text-[15px] tracking-[3px] text-white">
      {children}
    </h2>
  )
}

function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="md:col-span-6 pt-[10px] pb-0 font-cairo font-black uppercase text-[12px] tracking-[4px] text-brand-red">
      {children}
    </h3>
  )
}

type FieldProps = {
  name: string
  label: string
  cols?: Cols
  type?: 'text' | 'email' | 'tel' | 'date'
  required?: boolean
  multiline?: boolean
  placeholder?: string
  autoComplete?: string
  maxLength?: number
}

function Field({
  name,
  label,
  cols = 3,
  type = 'text',
  required,
  multiline,
  placeholder,
  autoComplete,
  maxLength = 200,
}: FieldProps) {
  const errors = useContext(ErrorsContext)
  const id = `app-${name}`
  const shared = {
    id,
    name,
    required,
    placeholder,
    maxLength,
    'data-label': label,
    className: `field field-light ${errors.has(name) ? 'field-error' : ''}`,
  }
  return (
    <div className={colSpan[cols]}>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <Required />}
      </label>
      {multiline ? (
        <textarea {...shared} rows={3} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} />
      )}
    </div>
  )
}

type RadiosProps = {
  name: string
  label: string
  options: { value: string; label: string }[]
  cols?: Cols
  required?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

function Radios({ name, label, options, cols = 3, required, onChange }: RadiosProps) {
  const errors = useContext(ErrorsContext)
  return (
    <fieldset className={`${colSpan[cols]} ${errors.has(name) ? 'field-error p-[8px]' : ''}`}>
      <legend className={labelClass}>
        {label}
        {required && <Required />}
      </legend>
      <div className="flex flex-wrap gap-x-[24px] gap-y-[6px] pt-[12px] font-cairo font-semibold text-[16px] text-ink">
        {options.map((o) => (
          <label key={o.value} className="flex cursor-pointer items-center gap-[8px]">
            <input
              type="radio"
              name={name}
              value={o.value}
              required={required}
              data-label={label}
              onChange={onChange}
              className="h-[16px] w-[16px] accent-brand-red"
            />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

function Education({ prefix, level, credential }: (typeof education)[number]) {
  return (
    <>
      <SubHeading>{level}</SubHeading>
      <Field name={`${prefix}_school`} label="School" cols={3} />
      <Field name={`${prefix}_address`} label="Address" cols={3} maxLength={300} />
      <Field name={`${prefix}_from`} label="From" cols={1} placeholder="MM/YYYY" maxLength={20} />
      <Field name={`${prefix}_to`} label="To" cols={1} placeholder="MM/YYYY" maxLength={20} />
      <Radios name={`${prefix}_graduated`} label="Did you graduate?" cols={2} options={yesNo} />
      <Field name={`${prefix}_degree`} label={credential} cols={2} />
    </>
  )
}

function Reference({ prefix, n }: { prefix: string; n: number }) {
  return (
    <>
      <SubHeading>Reference {n}</SubHeading>
      <Field name={`${prefix}_name`} label="Full name" cols={4} />
      <Field name={`${prefix}_relationship`} label="Relationship" cols={2} />
      <Field name={`${prefix}_company`} label="Company" cols={4} />
      <Field name={`${prefix}_phone`} label="Phone" cols={2} type="tel" maxLength={50} />
      <Field name={`${prefix}_address`} label="Address" cols={6} maxLength={300} />
    </>
  )
}

function Employment({ prefix, n }: { prefix: string; n: number }) {
  return (
    <>
      <SubHeading>Employer {n}</SubHeading>
      <Field name={`${prefix}_company`} label="Company" cols={4} />
      <Field name={`${prefix}_phone`} label="Phone" cols={2} type="tel" maxLength={50} />
      <Field name={`${prefix}_address`} label="Address" cols={4} maxLength={300} />
      <Field name={`${prefix}_supervisor`} label="Supervisor" cols={2} />
      <Field name={`${prefix}_title`} label="Job title" cols={2} />
      <Field
        name={`${prefix}_startingSalary`}
        label="Starting salary"
        cols={2}
        placeholder="$"
        maxLength={50}
      />
      <Field
        name={`${prefix}_endingSalary`}
        label="Ending salary"
        cols={2}
        placeholder="$"
        maxLength={50}
      />
      <Field
        name={`${prefix}_responsibilities`}
        label="Responsibilities"
        cols={6}
        multiline
        maxLength={2000}
      />
      <Field name={`${prefix}_from`} label="From" cols={1} placeholder="MM/YYYY" maxLength={20} />
      <Field name={`${prefix}_to`} label="To" cols={1} placeholder="MM/YYYY" maxLength={20} />
      <Field name={`${prefix}_reason`} label="Reason for leaving" cols={4} maxLength={500} />
      <Radios
        name={`${prefix}_mayContact`}
        label="May we contact your previous supervisor for a reference?"
        cols={6}
        options={yesNo}
      />
    </>
  )
}

/** Every `required` control that is still empty, in document order (one entry per radio group). */
function missingFields(form: HTMLFormElement, fd: FormData): Missing[] {
  const out: Missing[] = []
  const seen = new Set<string>()
  for (const el of form.elements) {
    if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)) continue
    if (!el.required || seen.has(el.name)) continue
    seen.add(el.name)
    if (String(fd.get(el.name) ?? '').trim()) continue
    out.push({ name: el.name, label: el.dataset.label ?? el.name })
  }
  return out
}

export function ApplicationForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [missing, setMissing] = useState<Missing[]>([])
  // answers that reveal a follow-up question
  const [source, setSource] = useState('')
  const [citizen, setCitizen] = useState('')
  const [felony, setFelony] = useState('')
  const errors = useMemo(() => new Set(missing.map((m) => m.name)), [missing])
  const pdf = rawUrl(uploads.employmentPdf)

  async function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const errs = missingFields(form, fd)
    const email = String(fd.get('email') ?? '')
    if (email && !emailOk(email)) errs.push({ name: 'email', label: 'Email' })
    setMissing(errs)
    if (errs.length) {
      const first = form.elements.namedItem(errs[0].name)
      const el = first instanceof RadioNodeList ? first[0] : first
      if (el instanceof HTMLElement) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setStatus('sending')
    const payload: Record<string, string> = {}
    for (const [key, value] of fd.entries()) {
      if (typeof value === 'string') payload[key] = value.trim()
    }
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="txt mx-auto max-w-[600px] text-center font-cairo font-semibold text-[18px] leading-[1.8em] text-ink">
        <h3 className="font-cairo font-bold uppercase text-[18px] tracking-[4px] leading-[1.6em]">
          Thank you!
        </h3>
        <p>We've received your application and will be in touch soon.</p>
      </div>
    )
  }

  return (
    <ErrorsContext.Provider value={errors}>
      <form
        onSubmit={onSubmit}
        noValidate
        className="grid grid-cols-1 gap-x-[24px] gap-y-[18px] md:grid-cols-6"
      >
        <Band>Applicant Information</Band>
        <Field name="last" label="Last name" cols={3} required autoComplete="family-name" />
        <Field name="first" label="First name" cols={2} required autoComplete="given-name" />
        <Field name="middle" label="M.I." cols={1} maxLength={5} autoComplete="additional-name" />
        <Field
          name="street"
          label="Street address"
          cols={4}
          required
          maxLength={300}
          autoComplete="address-line1"
        />
        <Field name="unit" label="Apartment / unit #" cols={2} autoComplete="address-line2" />
        <Field name="city" label="City" cols={3} required autoComplete="address-level2" />
        <Field
          name="state"
          label="State"
          cols={1}
          required
          maxLength={50}
          autoComplete="address-level1"
        />
        <Field
          name="zip"
          label="ZIP code"
          cols={2}
          required
          maxLength={20}
          autoComplete="postal-code"
        />
        <Field
          name="phone"
          label="Phone"
          cols={3}
          type="tel"
          required
          maxLength={50}
          autoComplete="tel"
        />
        <Field name="email" label="Email" cols={3} type="email" required autoComplete="email" />
        <Field name="dob" label="Date of birth" cols={2} type="date" autoComplete="bday" />
        <Field name="available" label="Date available to work" cols={2} type="date" required />
        <Field name="position" label="Position applied for" cols={2} required />
        <Radios
          name="source"
          label="How did you learn about us?"
          cols={6}
          options={sources}
          onChange={(e) => setSource(e.target.value)}
        />
        {source === 'Other' && <Field name="sourceOther" label="Please specify" cols={3} />}
        <Radios
          name="citizen"
          label="Are you a citizen of the United States?"
          cols={6}
          options={yesNo}
          required
          onChange={(e) => setCitizen(e.target.value)}
        />
        {citizen === 'no' && (
          <Radios
            name="authorized"
            label="Are you authorized to work in the U.S.?"
            cols={6}
            options={yesNo}
            required
          />
        )}
        <Radios
          name="felony"
          label="Have you ever been convicted of a felony?"
          cols={6}
          options={yesNo}
          required
          onChange={(e) => setFelony(e.target.value)}
        />
        {felony === 'yes' && (
          <Field
            name="felonyExplain"
            label="Please explain"
            cols={6}
            multiline
            maxLength={2000}
            required
          />
        )}
        <p className="md:col-span-6 pb-0 font-cairo text-[13px] text-muted">
          We don't collect Social Security numbers online. If you're hired, we'll ask for it in
          person.
        </p>

        <Band>Education</Band>
        {education.map((row) => (
          <Education key={row.prefix} {...row} />
        ))}

        <Band>References</Band>
        <p className={noteClass}>Please list two professional references.</p>
        <Reference prefix="ref0" n={1} />
        <Reference prefix="ref1" n={2} />

        <Band>Previous Employment</Band>
        <Employment prefix="job0" n={1} />
        <Employment prefix="job1" n={2} />

        <Band>Disclaimer and Signature</Band>
        <div className={`${noteClass} leading-[1.8em]`}>
          <p>I certify that my answers are true and complete to the best of my knowledge.</p>
          <p>
            If this application leads to employment, I understand that false or misleading
            information in my application or interview may result in my release.
          </p>
        </div>
        <label
          className={`md:col-span-6 flex cursor-pointer items-start gap-[10px] font-cairo font-semibold text-[16px] text-ink ${
            errors.has('certify') ? 'field-error p-[8px]' : ''
          }`}
        >
          <input
            type="checkbox"
            name="certify"
            required
            data-label="Agreement to the statement above"
            className="mt-[4px] h-[16px] w-[16px] shrink-0 accent-brand-red"
          />
          <span>
            I have read and agree to the statement above
            <Required />
          </span>
        </label>
        <Field
          name="signature"
          label="Signature (type your full name)"
          cols={4}
          required
          autoComplete="name"
        />

        <p className="absolute scale-[0.01]" aria-hidden="true">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="border-0 bg-transparent"
          />
        </p>

        <div className="md:col-span-6 pt-[10px] text-right">
          {missing.length > 0 && (
            <div className="mb-[16px] text-left font-cairo text-[15px] text-brand-red">
              <p>Please fill in the following fields:</p>
              <ul className="list-disc pl-[1.5em]">
                {missing.map((m) => (
                  <li key={m.name}>{m.label}</li>
                ))}
              </ul>
            </div>
          )}
          {status === 'error' && (
            <p className="mb-[16px] text-left font-cairo text-[15px] text-brand-red">
              Sorry, your application could not be sent. Please call us at {site.phone} or{' '}
              <a href={pdf} target="_blank" rel="noopener noreferrer" className="underline">
                download the PDF
              </a>{' '}
              and bring it in.
            </p>
          )}
          <Button type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Submit Application'}
          </Button>
        </div>
      </form>
    </ErrorsContext.Provider>
  )
}
