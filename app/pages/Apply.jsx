import { useId, useState } from 'react'
import { useFetcher } from 'react-router'
import { Icon } from '../components/icons'
import { Section } from '../components/Section'
import { site } from '../data/site'
import { send } from '../lib/forms'

export const clientAction = ({ request }) => send(request, 'apply')

export const meta = () => [
  { title: 'Employment Application | Postal 98 Cafe' },
  {
    name: 'description',
    content: 'Apply to join the team at Postal 98 Cafe in Pinecraft, Sarasota, Florida.',
  },
]

const caption = 'eyebrow text-ink text-xs'

const miniBand = 'bg-surface px-3 py-1 text-brand text-sm uppercase tracking-widest'

function MiniBand({ children }) {
  return <h4 className={`${miniBand} md:col-span-6`}>{children}</h4>
}

/** Mini band that opens and closes a group of fields (closed fields still submit). */
function Collapsible({ summary, open, children }) {
  return (
    <details className="group md:col-span-6" open={open}>
      <summary className={`${miniBand} flex cursor-pointer items-center justify-between`}>
        {summary}
        <Icon name="expand_more" className="transition-transform group-open:rotate-180" />
      </summary>
      <div className="grid gap-x-6 gap-y-4 pt-4 md:grid-cols-6">{children}</div>
    </details>
  )
}

function Band({ children }) {
  return (
    <h3 className="eyebrow mt-4 bg-ink py-2 text-center text-white md:col-span-6">{children}</h3>
  )
}

const Required = () => <span className="text-brand"> *</span>

function Field({ label, name, className = '', multiline, required, ...props }) {
  const id = useId()
  return (
    <label htmlFor={id} className={`block ${className}`}>
      <span className={caption}>
        {label}
        {required && <Required />}
      </span>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          className="field field-light"
          required={required}
          {...props}
        />
      ) : (
        <input id={id} name={name} className="field field-light" required={required} {...props} />
      )}
    </label>
  )
}

function Radios({ legend, className = '', required, onChange, children }) {
  return (
    <fieldset className={className} onChange={onChange}>
      <legend className={caption}>
        {legend}
        {required && <Required />}
      </legend>
      <div className="flex flex-wrap gap-x-6 gap-y-2 py-2">{children}</div>
    </fieldset>
  )
}

function Radio({ name, value, required, children }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-ink">
      <input
        type="radio"
        name={name}
        value={value}
        required={required}
        className="accent-brand user-invalid:outline-2 user-invalid:outline-brand"
      />
      {children}
    </label>
  )
}

function YesNo({ legend, name, className, required, onChange }) {
  return (
    <Radios legend={legend} className={className} required={required} onChange={onChange}>
      <Radio name={name} value="yes" required={required}>
        Yes
      </Radio>
      <Radio name={name} value="no" required={required}>
        No
      </Radio>
    </Radios>
  )
}

function Source() {
  const [source, setSource] = useState()
  return (
    <>
      <Radios
        legend="How did you learn about us?"
        className="md:col-span-6"
        onChange={(e) => setSource(e.target.value)}
      >
        <Radio name="source" value="Advertisement">
          Advertisement
        </Radio>
        <Radio name="source" value="Employment Agency">
          Employment Agency
        </Radio>
        <Radio name="source" value="Friend">
          Friend
        </Radio>
        <Radio name="source" value="Relative">
          Relative
        </Radio>
        <Radio name="source" value="Walk-in">
          Walk-in
        </Radio>
        <Radio name="source" value="Other">
          Other
        </Radio>
      </Radios>
      {source === 'Other' && (
        <Field label="Please specify" name="sourceOther" className="md:col-span-6" />
      )}
    </>
  )
}

function WorkAuthorization() {
  const [citizen, setCitizen] = useState()
  const [felony, setFelony] = useState()
  return (
    <>
      <MiniBand>Work Authorization</MiniBand>
      <YesNo
        legend="Are you a citizen of the United States?"
        name="citizen"
        className="md:col-span-3"
        required
        onChange={(e) => setCitizen(e.target.value)}
      />
      {citizen === 'no' && (
        <YesNo
          legend="Are you authorized to work in the U.S.?"
          name="authorized"
          className="md:col-span-3"
          required
        />
      )}
      <YesNo
        legend="Have you ever been convicted of a felony?"
        name="felony"
        className="md:col-span-6"
        required
        onChange={(e) => setFelony(e.target.value)}
      />
      {felony === 'yes' && (
        <Field
          label="Please explain"
          name="felonyExplain"
          multiline
          rows={2}
          className="md:col-span-6"
          required
        />
      )}
    </>
  )
}

function Education({ prefix, level, credential, open }) {
  return (
    <Collapsible summary={level} open={open}>
      <Field label="School" name={`${prefix}_school`} className="md:col-span-3" />
      <Field label="Address" name={`${prefix}_address`} className="md:col-span-3" />
      <Field label="From" name={`${prefix}_from`} placeholder="MM/YYYY" className="md:col-span-1" />
      <Field label="To" name={`${prefix}_to`} placeholder="MM/YYYY" className="md:col-span-1" />
      <YesNo legend="Did you graduate?" name={`${prefix}_graduated`} className="md:col-span-2" />
      <Field label={credential} name={`${prefix}_degree`} className="md:col-span-2" />
    </Collapsible>
  )
}

function Reference({ n, open }) {
  const prefix = `ref${n}`
  return (
    <Collapsible summary={`Reference ${n}`} open={open}>
      <Field label="Full name" name={`${prefix}_name`} className="md:col-span-4" />
      <Field label="Relationship" name={`${prefix}_relationship`} className="md:col-span-2" />
      <Field label="Company" name={`${prefix}_company`} className="md:col-span-4" />
      <Field label="Phone" name={`${prefix}_phone`} type="tel" className="md:col-span-2" />
      <Field label="Address" name={`${prefix}_address`} className="md:col-span-6" />
    </Collapsible>
  )
}

function Employment({ n, open }) {
  const prefix = `job${n}`
  return (
    <Collapsible summary={`Employer ${n}`} open={open}>
      <Field label="Company" name={`${prefix}_company`} className="md:col-span-4" />
      <Field label="Phone" name={`${prefix}_phone`} type="tel" className="md:col-span-2" />
      <Field label="Address" name={`${prefix}_address`} className="md:col-span-4" />
      <Field label="Supervisor" name={`${prefix}_supervisor`} className="md:col-span-2" />
      <Field label="Job title" name={`${prefix}_title`} className="md:col-span-2" />
      <Field label="Starting salary" name={`${prefix}_startingSalary`} className="md:col-span-2" />
      <Field label="Ending salary" name={`${prefix}_endingSalary`} className="md:col-span-2" />
      <Field
        label="Responsibilities"
        name={`${prefix}_responsibilities`}
        multiline
        rows={2}
        className="md:col-span-6"
      />
      <Field label="From" name={`${prefix}_from`} placeholder="MM/YYYY" className="md:col-span-1" />
      <Field label="To" name={`${prefix}_to`} placeholder="MM/YYYY" className="md:col-span-1" />
      <Field label="Reason for leaving" name={`${prefix}_reason`} className="md:col-span-4" />
      <YesNo
        legend="May we contact your previous supervisor for a reference?"
        name={`${prefix}_mayContact`}
        className="md:col-span-6"
      />
    </Collapsible>
  )
}

/** The signature line unlocks once the applicant agrees to the disclaimer. */
function Signature() {
  const [agreed, setAgreed] = useState(false)
  return (
    <>
      <label className="flex cursor-pointer items-center gap-2 text-ink md:col-span-6">
        <input
          type="checkbox"
          name="certify"
          required
          className="accent-brand user-invalid:outline-2 user-invalid:outline-brand"
          onChange={(e) => setAgreed(e.target.checked)}
        />
        I agree to the statement above
        <Required />
      </label>
      <Field
        label="Signature (type your full name)"
        name="signature"
        className="md:col-span-4"
        required
        disabled={!agreed}
      />
      <Field
        label="Date"
        name="date"
        type="date"
        className="md:col-span-2"
        required
        disabled={!agreed}
      />
    </>
  )
}

function ApplicationForm() {
  const fetcher = useFetcher()
  const sending = fetcher.state !== 'idle'
  if (fetcher.data?.ok) {
    return (
      <p className="mt-8 text-center font-semibold text-ink text-xl">
        Thank you! Your application has been sent and we will be in touch.
      </p>
    )
  }
  return (
    <fetcher.Form method="post" className="mt-8 grid gap-x-6 gap-y-4 font-semibold md:grid-cols-6">
      <Band>Applicant Information</Band>
      <MiniBand>Full Name</MiniBand>
      <Field
        label="Last name"
        name="last"
        className="md:col-span-3"
        required
        autoComplete="family-name"
      />
      <Field
        label="First name"
        name="first"
        className="md:col-span-2"
        required
        autoComplete="given-name"
      />
      <Field label="M.I." name="middle" className="md:col-span-1" autoComplete="additional-name" />
      <MiniBand>Address</MiniBand>
      <Field
        label="Street address"
        name="street"
        className="md:col-span-4"
        required
        autoComplete="address-line1"
      />
      <Field
        label="Apartment / unit #"
        name="unit"
        className="md:col-span-2"
        autoComplete="address-line2"
      />
      <Field
        label="City"
        name="city"
        className="md:col-span-3"
        required
        autoComplete="address-level2"
      />
      <Field
        label="State"
        name="state"
        className="md:col-span-1"
        required
        autoComplete="address-level1"
      />
      <Field
        label="ZIP code"
        name="zip"
        className="md:col-span-2"
        required
        autoComplete="postal-code"
      />
      <MiniBand>Contact</MiniBand>
      <Field
        label="Phone"
        name="phone"
        type="tel"
        className="md:col-span-3"
        required
        autoComplete="tel"
      />
      <Field
        label="Email"
        name="email"
        type="email"
        className="md:col-span-3"
        required
        autoComplete="email"
      />
      <MiniBand>Position</MiniBand>
      <Field
        label="Date available to work"
        name="available"
        type="date"
        className="md:col-span-3"
        required
      />
      <Field label="Position applied for" name="position" className="md:col-span-3" required />
      <label className="flex cursor-pointer items-center gap-2 text-ink md:col-span-6">
        <input
          type="checkbox"
          name="ageEligible"
          required
          className="accent-brand user-invalid:outline-2 user-invalid:outline-brand"
        />
        I am 18 or older, or at least 16 with parental consent to work
        <Required />
      </label>
      <MiniBand>Referral</MiniBand>
      <Source />
      <WorkAuthorization />

      <Band>Education</Band>
      <Education prefix="edu0" level="High School" credential="Diploma" open />
      <Education prefix="edu1" level="College" credential="Degree" />
      <Education prefix="edu2" level="Other" credential="Degree" />

      <Band>References</Band>
      <p className="text-ink md:col-span-6">Please list two professional references.</p>
      <Reference n={1} open />
      <Reference n={2} />

      <Band>Previous Employment</Band>
      <Employment n={1} open />
      <Employment n={2} />

      <Band>Disclaimer and Signature</Band>
      <p className="text-ink md:col-span-6">
        I certify that my answers are true and complete to the best of my knowledge. If this
        application leads to employment, I understand that false or misleading information in my
        application or interview may result in my release.
      </p>
      <Signature />
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" />
      <div className="md:col-span-6">
        <button type="submit" className="btn mt-6" disabled={sending}>
          {sending ? 'Sending…' : 'Submit Application'}
        </button>
        {fetcher.data && !fetcher.data.ok && (
          <p className="mt-4 text-brand">
            Sorry, that didn't go through. Please call us at {site.phone}.
          </p>
        )}
      </div>
    </fetcher.Form>
  )
}

export default function Apply() {
  return (
    <Section title="Join Our Team">
      <div className="border-4 border-ink p-8 lg:p-12">
        <p className="mx-auto max-w-150 text-center font-semibold leading-loose">
          Fill out the application below and we will be in touch. Fields marked with
          <Required /> are required.
        </p>
        <ApplicationForm />
      </div>
    </Section>
  )
}
