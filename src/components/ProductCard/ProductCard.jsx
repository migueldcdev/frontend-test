import { Link } from 'react-router-dom'

export default function ProductCard({ product: { id, brand, model, price, imageUrl } }) {
  return (
    <Link
      to={`/product/${id}`}
      className="flex h-full flex-col items-center gap-2 rounded border border-gray-200 bg-white p-4 text-center hover:shadow"
    >
      <img src={imageUrl} alt={`${brand} ${model}`} loading="lazy" className="h-40 object-contain" />
      <span className="text-sm text-gray-500">{brand}</span>
      <span className="font-semibold">{model}</span>
      <span>{price ? `${price} €` : '-'}</span>
    </Link>
  )
}
