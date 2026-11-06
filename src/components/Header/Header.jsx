import { Link } from 'react-router-dom'
import Breadcrumbs from './Breadcrumbs.jsx'

export default function Header({ productName }) {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl space-y-1 p-4">
        <Link to="/" className="text-xl font-bold">
          Mobile Shop
        </Link>
        <Breadcrumbs productName={productName} />
      </div>
    </header>
  )
}
