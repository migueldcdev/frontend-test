import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import Breadcrumbs from './Breadcrumbs.jsx'

export default function Header({ productName }) {
  const { count } = useCart()

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl space-y-1 p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            Mobile Shop
          </Link>
          <p>Cart: {count}</p>
        </div>
        <Breadcrumbs productName={productName} />
      </div>
    </header>
  )
}
