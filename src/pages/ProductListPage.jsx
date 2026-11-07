import { useState } from 'react'
import { getProducts } from '../api/products.js'
import PageLayout from '../components/PageLayout/PageLayout.jsx'
import ProductCard from '../components/ProductCard/ProductCard.jsx'
import SearchBar from '../components/SearchBar/SearchBar.jsx'
import { useAsync } from '../hooks/useAsync.js'

function matchesQuery({ brand, model }, query) {
  const normalizedQuery = query.trim().toLowerCase()
  return `${brand} ${model}`.toLowerCase().includes(normalizedQuery)
}

export default function ProductListPage() {
  const { value: products, isLoading, hasError } = useAsync(getProducts)
  const [query, setQuery] = useState('')
  const visibleProducts = products?.filter((product) => matchesQuery(product, query))

  return (
    <PageLayout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <SearchBar query={query} onQueryChange={setQuery} />
      </div>
      {isLoading && <p>Loading...</p>}
      {hasError && <p>Something went wrong</p>}
      {visibleProducts?.length === 0 && <p>No products found</p>}
      {visibleProducts?.length > 0 && (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </PageLayout>
  )
}
