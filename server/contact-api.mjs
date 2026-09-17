// Postal 98 Cafe — forms API
//
// Zero-dependency Node (18+) HTTP server. Receives the Contact page form
// (/api/contact) and the employment application (/api/apply) and emails them
// to the cafe through Resend's HTTP API.
//
//   node server/contact-api.mjs
//
// Env vars:
//   RESEND_API_KEY      required — from https://resend.com/api-keys
//   CONTACT_TO_EMAIL    where messages and applications are delivered
//   CONTACT_FROM_EMAIL  verified Resend sender (default: onboarding@resend.dev — replace
//                       with e.g. contact@postal98cafe.com once the domain is verified)
//   PORT                default 8787
//   DRY_RUN             "1" = log the email instead of sending (for testing)
//
// Apache/cPanel should route /api/ to this process — see server/README.md.

import { createServer } from 'node:http'

const PORT = Number(process.env.PORT || 8787)
const TO = process.env.CONTACT_TO_EMAIL
const FROM = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev'
const DRY_RUN = process.env.DRY_RUN === '1'

if (!TO) console.warn('CONTACT_TO_EMAIL is not set — submissions will fail')
if (!process.env.RESEND_API_KEY && !DRY_RUN)
  console.warn('RESEND_API_KEY is not set — submissions will fail')

const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  )
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SANS = 'font-family:sans-serif'

// ── naive per-IP rate limit: 5 messages / 10 min ──
const hits = new Map()
function rateLimited(ip) {
  const now = Date.now()
  const windowStart = now - 10 * 60 * 1000
  const list = (hits.get(ip) || []).filter((t) => t > windowStart)
  list.push(now)
  hits.set(ip, list)
  if (hits.size > 5000) hits.clear()
  return list.length > 5
}

// ── Contact form (/api/contact) ──

function validateContact(body) {
  if (typeof body !== 'object' || body === null) return 'bad payload'
  if (body.website) return 'spam' // honeypot — humans never fill it
  for (const key of ['name', 'email', 'message']) {
    if (typeof body[key] !== 'string' || !body[key].trim()) return `missing ${key}`
  }
  if (body.name.length > 200 || body.email.length > 200) return 'too long'
  if (body.message.length > 5000) return 'message too long'
  if (!EMAIL_RE.test(body.email)) return 'invalid email'
  return null
}

function buildContactEmail({ name, email, message }) {
  const html = `
    <h2 style="${SANS}">New message from postal98cafe.com</h2>
    <p style="${SANS};font-size:14px;line-height:1.7">
      <strong>Name:</strong> ${esc(name.trim())}<br>
      <strong>Email:</strong> <a href="mailto:${esc(email.trim())}">${esc(email.trim())}</a>
    </p>
    <h3 style="${SANS}">Message</h3>
    <p style="${SANS};font-size:14px;line-height:1.7;white-space:pre-wrap">${esc(message.trim())}</p>
    <p style="${SANS};font-size:12px;color:#888">Reply to this email to answer them directly.</p>`
  return {
    from: `Postal 98 Cafe Website <${FROM}>`,
    to: [TO],
    reply_to: email.trim(),
    subject: `Website message from ${name.trim()}`,
    html,
  }
}

// ── Employment application (/api/apply) ──
//
// Mirrors the paper form section by section. Each field is [key, label, rules]
// where key is the form control's name (src/components/ApplicationForm.tsx).
// Rules: required, requiredIf: [otherKey, value], max (default 200), enum, email.
// The paper form's Social Security number line is intentionally absent: it is
// not collected online until submissions can be encrypted end to end.

const YES_NO = { enum: ['yes', 'no'] }
const SOURCES = ['Advertisement', 'Employment Agency', 'Friend', 'Relative', 'Walk-in', 'Other']

const APPLICANT = [
  ['last', 'Last name', { required: true }],
  ['first', 'First name', { required: true }],
  ['middle', 'Middle initial', { max: 5 }],
  ['street', 'Street address', { required: true, max: 300 }],
  ['unit', 'Apartment / unit #'],
  ['city', 'City', { required: true }],
  ['state', 'State', { required: true, max: 50 }],
  ['zip', 'ZIP code', { required: true, max: 20 }],
  ['phone', 'Phone', { required: true, max: 50 }],
  ['email', 'Email', { required: true, email: true }],
  ['dob', 'Date of birth', { max: 50 }],
  ['available', 'Date available to work', { required: true, max: 50 }],
  ['position', 'Position applied for', { required: true }],
  ['source', 'How did you learn about us?', { enum: SOURCES }],
  ['sourceOther', 'Other source'],
  ['citizen', 'U.S. citizen?', { required: true, ...YES_NO }],
  ['authorized', 'Authorized to work in the U.S.?', { requiredIf: ['citizen', 'no'], ...YES_NO }],
  ['felony', 'Ever convicted of a felony?', { required: true, ...YES_NO }],
  ['felonyExplain', 'Explanation', { requiredIf: ['felony', 'yes'], max: 2000 }],
]
const education = (p, credential) => [
  [`${p}_school`, 'School'],
  [`${p}_address`, 'Address', { max: 300 }],
  [`${p}_from`, 'From', { max: 20 }],
  [`${p}_to`, 'To', { max: 20 }],
  [`${p}_graduated`, 'Graduated?', YES_NO],
  [`${p}_degree`, credential],
]
const reference = (p) => [
  [`${p}_name`, 'Full name'],
  [`${p}_relationship`, 'Relationship'],
  [`${p}_company`, 'Company'],
  [`${p}_phone`, 'Phone', { max: 50 }],
  [`${p}_address`, 'Address', { max: 300 }],
]
const employment = (p) => [
  [`${p}_company`, 'Company'],
  [`${p}_phone`, 'Phone', { max: 50 }],
  [`${p}_address`, 'Address', { max: 300 }],
  [`${p}_supervisor`, 'Supervisor'],
  [`${p}_title`, 'Job title'],
  [`${p}_startingSalary`, 'Starting salary', { max: 50 }],
  [`${p}_endingSalary`, 'Ending salary', { max: 50 }],
  [`${p}_responsibilities`, 'Responsibilities', { max: 2000 }],
  [`${p}_from`, 'From', { max: 20 }],
  [`${p}_to`, 'To', { max: 20 }],
  [`${p}_reason`, 'Reason for leaving', { max: 500 }],
  [`${p}_mayContact`, 'May we contact this supervisor?', YES_NO],
]
const SIGNATURE = [
  ['certify', 'Certified true and complete', { required: true, enum: ['on'] }],
  ['signature', 'Signature', { required: true }],
]

const APPLICATION_SECTIONS = [
  ['Applicant Information', APPLICANT],
  ['Education — High School', education('edu0', 'Diploma')],
  ['Education — College', education('edu1', 'Degree')],
  ['Education — Other', education('edu2', 'Degree')],
  ['Reference 1', reference('ref0')],
  ['Reference 2', reference('ref1')],
  ['Previous Employment 1', employment('job0')],
  ['Previous Employment 2', employment('job1')],
  ['Disclaimer and Signature', SIGNATURE],
]
const APPLICATION_FIELDS = APPLICATION_SECTIONS.flatMap(([, fields]) => fields)

/** Checks every known field and trims it in place; unknown keys are ignored. */
function validateApplication(body) {
  if (typeof body !== 'object' || body === null) return 'bad payload'
  if (body.website) return 'spam'
  for (const [key, , rules = {}] of APPLICATION_FIELDS) {
    const raw = body[key]
    if (raw !== undefined && typeof raw !== 'string') return `bad ${key}`
    const v = (raw ?? '').trim()
    body[key] = v
    if (!v) {
      const [dep, when] = rules.requiredIf ?? []
      if (rules.required || (dep && body[dep] === when)) return `missing ${key}`
      continue
    }
    if (v.length > (rules.max ?? 200)) return `${key} too long`
    if (rules.enum && !rules.enum.includes(v)) return `bad ${key}`
    if (rules.email && !EMAIL_RE.test(v)) return 'invalid email'
  }
  return null
}

const display = (v) => ({ yes: 'Yes', no: 'No', on: 'Yes' })[v] ?? v

function buildApplicationEmail(app) {
  const name = `${app.first} ${app.last}`
  const submitted = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'long',
    timeStyle: 'short',
  })
  const cell = `${SANS};font-size:14px;line-height:1.6;padding:4px 8px;vertical-align:top;border-bottom:1px solid #eee`
  const sections = APPLICATION_SECTIONS.map(([title, fields]) => {
    const rows = fields
      .filter(([key]) => app[key])
      .map(
        ([key, label]) =>
          `<tr><th align="left" style="${cell};width:220px;color:#555">${esc(label)}</th>` +
          `<td style="${cell};white-space:pre-wrap">${esc(display(app[key]))}</td></tr>`,
      )
    if (!rows.length) return ''
    return (
      `<h3 style="${SANS};background:#555;color:#fff;padding:6px 10px;margin:24px 0 0">${esc(title)}</h3>` +
      `<table cellspacing="0" style="width:100%">${rows.join('')}</table>`
    )
  })
  const html = `
    <h2 style="${SANS}">Employment application from ${esc(name)}</h2>
    <p style="${SANS};font-size:14px;line-height:1.7">
      Submitted ${esc(submitted)} via postal98cafe.com<br>
      <strong>Position:</strong> ${esc(app.position)}<br>
      <strong>Phone:</strong> ${esc(app.phone)} &middot;
      <strong>Email:</strong> <a href="mailto:${esc(app.email)}">${esc(app.email)}</a>
    </p>
    ${sections.join('')}
    <p style="${SANS};font-size:12px;color:#888;margin-top:24px">
      Social Security number is not collected online — ask the applicant in person if hired.
      Reply to this email to contact the applicant directly.
    </p>`
  return {
    from: `Postal 98 Cafe Website <${FROM}>`,
    to: [TO],
    reply_to: app.email,
    subject: `Employment application: ${name} — ${app.position}`,
    html,
  }
}

// ── HTTP ──

const routes = {
  '/api/contact': [validateContact, buildContactEmail],
  '/api/apply': [validateApplication, buildApplicationEmail],
}

async function sendEmail(payload) {
  if (DRY_RUN) {
    console.log('[dry-run] would send:', JSON.stringify(payload, null, 2))
    return
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`)
}

const json = (res, status, obj) => {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(obj))
}

createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/api/health') return json(res, 200, { ok: true })
  const route = req.method === 'POST' ? routes[req.url] : undefined
  if (!route) return json(res, 404, { error: 'not found' })
  const [validate, buildEmail] = route

  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress || ''
  if (rateLimited(ip)) return json(res, 429, { error: 'too many requests' })

  let raw = ''
  for await (const chunk of req) {
    raw += chunk
    if (raw.length > 60_000) return json(res, 413, { error: 'payload too large' })
  }
  let body
  try {
    body = JSON.parse(raw)
  } catch {
    return json(res, 400, { error: 'invalid json' })
  }
  const err = validate(body)
  if (err === 'spam') return json(res, 200, { ok: true }) // silently drop bots
  if (err) return json(res, 400, { error: err })

  try {
    await sendEmail(buildEmail(body))
    return json(res, 200, { ok: true })
  } catch (e) {
    console.error(e)
    return json(res, 502, { error: 'email delivery failed' })
  }
}).listen(PORT, () => console.log(`forms api listening on :${PORT}${DRY_RUN ? ' (dry run)' : ''}`))
