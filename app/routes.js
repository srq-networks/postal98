import { index, route } from '@react-router/dev/routes'

// Paths match the WordPress slugs so existing search rankings carry over.
export default [
  index('pages/Home.jsx'),
  route('menu', 'pages/Menu.jsx'),
  route('our-story', 'pages/OurStory.jsx'),
  route('contact', 'pages/Contact.jsx'),
  route('apply', 'pages/Apply.jsx'),
]
