import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'

// Vite image tools generates multiple versions of an image based on a preset
const presets = {
  hero: 'w=768;1280;1920',
  photo: 'w=480;960;1440',
  poster: 'w=640;998',
  logo: 'w=240;480',
  thumb: 'w=320;640&aspect=3:4',
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    imagetools({
      defaultDirectives: (url) => {
        for (const [preset, sizes] of Object.entries(presets)) {
          if (url.searchParams.has(preset)) {
            return new URLSearchParams(`${sizes}&format=webp&quality=75&as=picture`)
          }
        }
        return new URLSearchParams()
      },
    }),
  ],
})
