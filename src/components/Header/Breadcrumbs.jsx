import { Link } from 'react-router-dom'

export default function Breadcrumbs({ productName }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex gap-2 text-xs text-neutral-500">
        <li>
          {productName ? <Link to="/" className="transition-colors hover:text-neutral-900">Home</Link> : <span aria-current="page">Home</span>}
        </li>
        {productName && (
          <>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-neutral-900">{productName}</li>
          </>
        )}
      </ol>
    </nav>
  )
}
