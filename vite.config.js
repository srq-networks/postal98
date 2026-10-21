import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'

// Vite image tools generates multiple versions of an image based on a preset
const presets = {
  hero: '768;1280;1920',
  photo: '480;960;1440',
  poster: '640;998',
  logo: '240;480',
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    imagetools({
      defaultDirectives: (url) => {
        for (const [preset, widths] of Object.entries(presets)) {
          if (url.searchParams.has(preset)) {
            return new URLSearchParams(`w=${widths}&format=webp&quality=75&as=picture`)
          }
        }
        return new URLSearchParams()
      },
    }),
  ],
})
