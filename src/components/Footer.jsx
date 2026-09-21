import { Link } from 'react-router-dom'
import { LocalTime } from './Chrome'
import { profile } from '../data/content'

// Slim footer for standalone pages. The home page closes with its own contact footer.
export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-site label-sm flex flex-col gap-3 py-8 text-fg-faint sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="flex flex-wrap gap-x-5 gap-y-1">
          <Link to="/" className="py-1 transition-colors hover:text-fg">
            Home
          </Link>
          <Link to="/contact" className="py-1 transition-colors hover:text-fg">
            Contact
          </Link>
          <span>
            Johannesburg <LocalTime />
          </span>
        </span>
      </div>
    </footer>
  )
}
