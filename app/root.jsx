import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from 'react-router'
import stylesheet from './app.css?url'
import icons from './assets/MaterialIcons-Regular.ttf?url'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

export const links = () => [
  { rel: 'stylesheet', href: stylesheet },
  { rel: 'preload', href: icons, as: 'font', type: 'font/ttf', crossOrigin: 'anonymous' },
]

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-28">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  const notFound = isRouteErrorResponse(error) && error.status === 404
  return (
    <main>
      <h1>{notFound ? 'Page not found' : 'Something went wrong'}</h1>
    </main>
  )
}
