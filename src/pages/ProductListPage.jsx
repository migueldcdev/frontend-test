import Header from '../components/Header/Header.jsx'
import ProductCard from '../components/ProductCard/ProductCard.jsx'
import { useProducts } from '../hooks/useProducts.js'

export default function ProductListPage() {
  const { products, isLoading, hasError } = useProducts()

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl p-4">
        <h1 className="mb-4 text-2xl font-bold">Products</h1>
        {isLoading && <p>Loading...</p>}
        {hasError && <p>Something went wrong</p>}
        {products && (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
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
