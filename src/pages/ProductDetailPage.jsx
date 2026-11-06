import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header/Header.jsx'
import ProductActions from '../components/ProductActions/ProductActions.jsx'
import ProductDescription from '../components/ProductDescription/ProductDescription.jsx'
import ProductImage from '../components/ProductImage/ProductImage.jsx'
import { useProduct } from '../hooks/useProduct.js'

export default function ProductDetailPage() {
  const { id } = useParams()
  const { product, isLoading, hasError } = useProduct(id)
  const productName = product && `${product.brand} ${product.model}`

  return (
    <>
      <Header productName={productName} />
      <main className="mx-auto max-w-6xl p-4">
        <Link to="/" className="mb-4 inline-block hover:underline">
          ← Back to list
        </Link>
        {isLoading && <p>Loading...</p>}
        {hasError && <p>Something went wrong</p>}
        {product && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <ProductImage imageUrl={product.imageUrl} name={productName} />
            <section>
              <h1 className="mb-4 text-2xl font-bold">{productName}</h1>
              <ProductDescription product={product} />
              <ProductActions colors={product.colors} storages={product.storages} />
            </section>
          </div>
        )}
      </main>
    </>
  )
}
