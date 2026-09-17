import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// /api is proxied to the contact API (run: bun run api, default port 8787;
// override with API_PORT). In production Apache routes /api/ to the same Node
// process — see server/README.md.
const apiProxy = { '/api': `http://localhost:${process.env.API_PORT ?? 8787}` }

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { host: true, proxy: apiProxy, allowedHosts: ['nebula.tail2fc318.ts.net'] },
  preview: { host: true, proxy: apiProxy },
})
