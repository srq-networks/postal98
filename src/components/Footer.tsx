import { site } from '../data/site'
import { FacebookIcon, InstagramIcon } from './icons'

export function Footer() {
  return (
    <footer className="bg-footer">
      <div className="bg-black/[0.32] pt-[15px] pb-[5px]">
        <div className="row !py-0 flex flex-col-reverse items-center gap-[5px] lg:flex-row lg:justify-between">
          <div className="pb-[10px] text-[14px] text-muted">
            Developed by {site.links.developer}
          </div>
          <ul className="flex">
            <li className="ml-[20px]">
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
            <li className="ml-[20px]">
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
