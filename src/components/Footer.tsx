import { site } from '../data/site'
import { FacebookIcon, InstagramIcon } from './icons'

export function Footer() {
  return (
    <footer className="bg-footer">
      <div className="bg-black/32 pt-3.75 pb-1.25">
        <div className="row py-0! flex flex-col-reverse items-center gap-1.25 lg:flex-row lg:justify-between">
          <div className="pb-2.5 text-sm text-muted">Developed with love by Sarasota Networks</div>
          <ul className="flex">
            <li className="ml-5">
              <a
                href={site.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-muted transition-colors duration-300 hover:opacity-70"
              >
                <span className="sr-only">Facebook</span>
                <FacebookIcon />
              </a>
            </li>
            <li className="ml-5">
              <a
                href={site.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-muted transition-colors duration-300 hover:opacity-70"
              >
                <span className="sr-only">Instagram</span>
                <InstagramIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
