import { Link } from 'react-router-dom'

export default function ProductCard({ product: { id, brand, model, price, imageUrl } }) {
  return (
    <Link
      to={`/product/${id}`}
      className="group flex h-full flex-col gap-1 rounded-2xl border border-neutral-200/70 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-neutral-900/5"
    >
      <img src={imageUrl} alt={`${brand} ${model}`} loading="lazy" className="mb-4 h-44 w-full object-contain transition-transform duration-300 group-hover:scale-105" />
      <span className="text-xs uppercase tracking-wider text-neutral-400">{brand}</span>
      <span className="font-medium">{model}</span>
      <span className="mt-auto pt-2 text-sm text-neutral-600">{price ? `${price} €` : '-'}</span>
    </Link>
  )
}
