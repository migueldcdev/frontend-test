import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import Breadcrumbs from './Breadcrumbs.jsx'

export default function Header({ productName }) {
  const { count } = useCart()

  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl space-y-2 px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-lg font-semibold tracking-tight">
            Mobile Shop
          </Link>
          <p className="rounded-full bg-neutral-900 px-3 py-1 text-sm font-medium text-white">Cart: {count}</p>
        </div>
        <Breadcrumbs productName={productName} />
      </div>
    </header>
  )
}
