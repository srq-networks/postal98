# Server setup (Apache + cPanel)

Two things run on the box: the static site (`dist/`, uploaded by the GitHub
Action into the document root) and the forms API (`contact-api.mjs`, a single
Node 18+ file with zero dependencies). It handles both the Contact page form
(`POST /api/contact`) and the employment application (`POST /api/apply`); each
is emailed to `CONTACT_TO_EMAIL` through Resend, with the sender's address as
reply-to.

The application email carries everything on the paper form except the Social
Security number, which the web form does not ask for. Add it only once
submissions can be encrypted end to end (plain email through Resend is not).

## 1. Forms API

```bash
RESEND_API_KEY=re_xxx \
CONTACT_TO_EMAIL=owner@postal98cafe.com \
CONTACT_FROM_EMAIL=contact@postal98cafe.com \
node contact-api.mjs
```

### Option A — cPanel "Setup Node.js App" (simplest)

1. Upload `server/contact-api.mjs` somewhere outside the document root
   (e.g. `~/postal98-api/contact-api.mjs`).
2. cPanel → *Setup Node.js App* → Create application:
   - Application root: `postal98-api`
   - Application URL: `postal98cafe.com` / `api` (this mounts the app at `/api`,
     so Apache sends `/api/*` to it — no proxy rules needed)
   - Application startup file: `contact-api.mjs`
   - Environment variables: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
3. Start it. `https://postal98cafe.com/api/health` should return `{"ok":true}`.

### Option B — plain process + Apache proxy

Run it under a systemd unit and uncomment the proxy line in `public/.htaccess`
(needs `mod_proxy` + `mod_proxy_http`):

```ini
# /etc/systemd/system/postal98-contact-api.service
[Unit]
Description=Postal 98 Cafe contact API
After=network.target

[Service]
ExecStart=/usr/bin/node /home/<cpanel-user>/postal98-api/contact-api.mjs
EnvironmentFile=/home/<cpanel-user>/postal98-api/.env
Restart=always
User=<cpanel-user>

[Install]
WantedBy=multi-user.target
```

Test without sending real email: `DRY_RUN=1 node contact-api.mjs`, then
`curl -X POST localhost:8787/api/contact -H 'content-type: application/json' -d '{"name":"T","email":"t@example.com","message":"hi"}'`.
For the application, post the field names from `src/components/ApplicationForm.tsx`
(required: `last first street city state zip phone email available position
citizen felony certify signature`, with `certify` = `"on"`).

### Where the secret lives

The Resend key is only ever set in the environment of this process on the
server (cPanel env vars or the systemd `EnvironmentFile`). It is **not** a
GitHub secret and never enters the repo or the build — the browser only calls
`/api/contact`. GitHub secrets are used just for the FTP deploy credentials.

### Resend (one time)

1. Create an account at resend.com (free tier: 3,000 emails/month).
2. Add and verify the `postal98cafe.com` domain (three DNS records) so mail can
   come from `contact@postal98cafe.com`. Until then `onboarding@resend.dev` works
   for testing but only delivers to the Resend account's own address.
3. Create an API key → `RESEND_API_KEY`.

## 2. Apache

`public/.htaccess` ships with the build. It serves `index.html` for client-side
routes (`/menu`, `/our-story`, `/contact`, `/apply`) and leaves `/api/*` alone. It needs
`AllowOverride All` (the cPanel default) and `mod_rewrite`.
