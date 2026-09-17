# Postal 98 Cafe

React + Tailwind recreation of https://postal98cafe.com (Home, Menu, Our Story,
Contact, plus an online employment application at `/apply`), built with Vite,
React Router and TypeScript.

## Develop

```bash
bun install
bun run dev            # http://localhost:5173
```

The contact form posts to `/api/contact` and the employment application to
`/api/apply`; Vite proxies both to the forms API. Run it in a second terminal
(see `server/README.md`; use `DRY_RUN=1` to log instead of sending):

```bash
cp .env.example .env   # fill in RESEND_API_KEY etc.
set -a; source .env; set +a
bun run api
```

## Assets

Every image, the hero video, the Outside font and the PDFs come from the live
site. `public/assets/` is committed, so nothing needs downloading to build. To
refresh or add assets, edit `src/data/galleries.ts` / `src/data/site.ts` and run:

```bash
bun run assets         # downloads originals to assets/raw/ (gitignored), processes with sharp + ffmpeg
```

## Checks

```bash
bun run lint           # biome
bun run typecheck      # tsc --noEmit
bun run build          # vite → dist/
```

## Deploy

Pushing to `main` builds and uploads `dist/` to the cPanel document root over
FTPS (`.github/workflows/deploy.yml`; secrets `FTP_HOST`, `FTP_USERNAME`,
`FTP_PASSWORD`). The forms API is set up once on the server — see
`server/README.md`. The Resend key stays on the server only.
