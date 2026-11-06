import { useState } from 'react'
import Header from '../components/Header/Header.jsx'
import ProductCard from '../components/ProductCard/ProductCard.jsx'
import SearchBar from '../components/SearchBar/SearchBar.jsx'
import { useProducts } from '../hooks/useProducts.js'

function matchesQuery({ brand, model }, query) {
  const normalizedQuery = query.trim().toLowerCase()
  return `${brand} ${model}`.toLowerCase().includes(normalizedQuery)
}

export default function ProductListPage() {
  const { products, isLoading, hasError } = useProducts()
  const [query, setQuery] = useState('')
  const visibleProducts = products?.filter((product) => matchesQuery(product, query))

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl p-4">
        <h1 className="mb-4 text-2xl font-bold">Products</h1>
        <SearchBar query={query} onQueryChange={setQuery} />
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
      </main>
    </>
  )
}
