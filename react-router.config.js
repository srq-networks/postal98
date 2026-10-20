// Static build: every page is prerendered to HTML and served by Apache as plain
// files. Flip `ssr` to true once the host can run Node to enable server actions.
export default {
  ssr: false,
  prerender: ['/', '/menu', '/our-story', '/contact', '/apply'],
}
