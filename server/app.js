// Static host for build/client plus the two form endpoints. Named app.js and CommonJS on purpose:
// cPanel's Passenger loads the startup file with require().
const path = require('node:path')
const express = require('express')
const { ServerClient } = require('postmark')

const { POSTMARK_SERVER_TOKEN, MAIL_FROM, MAIL_TO, PORT = 3000 } = process.env
const postmark = POSTMARK_SERVER_TOKEN ? new ServerClient(POSTMARK_SERVER_TOKEN) : null
const site = path.join(__dirname, 'public')

/* "job1_startingSalary" -> "Job 1 starting salary" */
const humanize = (name) =>
  name
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z0-9])/g, '$1 $2')
    .toLowerCase()
    .replace(/^./, (c) => c.toUpperCase())

/* One "Label: value" line per filled-in field, in the order the form sent them. */
const formatFields = (fields) =>
  Object.entries(fields)
    .filter(([, value]) => typeof value === 'string' && value.trim())
    .map(([name, value]) => `${humanize(name)}: ${value.trim().slice(0, 5000)}`)
    .join('\n')

async function sendMail({ subject, replyTo, fields }) {
  const text = formatFields(fields)
  if (!postmark) {
    console.log(`[dry run, no POSTMARK_SERVER_TOKEN]\nSubject: ${subject}\n${text}\n`)
    return
  }
  await postmark.sendEmail({
    From: MAIL_FROM,
    To: MAIL_TO,
    ReplyTo: replyTo,
    Subject: subject,
    TextBody: text,
    MessageStream: 'outbound',
  })
}

/* A form endpoint. `website` is a honeypot field humans never see; bots that fill it get a
   quiet success and no email. */
const form = (subject) => async (req, res) => {
  const { website, ...fields } = req.body ?? {}
  if (website) return res.json({ ok: true })
  try {
    await sendMail({ subject: subject(fields), replyTo: fields.email, fields })
    res.json({ ok: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false })
  }
}

const app = express()
app.use(express.json({ limit: '64kb' }))
app.post(
  '/api/contact',
  form((f) => `Website message from ${f.name}`),
)
app.post(
  '/api/apply',
  form((f) => `Employment application from ${f.first} ${f.last}`),
)
app.use(express.static(site))
app.use((_req, res) => res.status(404).sendFile('__spa-fallback.html', { root: site }))
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
