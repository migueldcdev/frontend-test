import { Link } from 'react-router-dom'

export default function Breadcrumbs({ productName }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex gap-2 text-sm text-gray-600">
        <li>
          {productName ? <Link to="/" className="hover:underline">Home</Link> : <span aria-current="page">Home</span>}
        </li>
        {productName && (
          <>
            <li aria-hidden="true">&gt;</li>
            <li aria-current="page">{productName}</li>
          </>
        )}
      </ol>
    </nav>
  )
}
