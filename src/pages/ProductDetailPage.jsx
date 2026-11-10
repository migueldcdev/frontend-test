import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../api/products.js'
import PageLayout from '../components/PageLayout/PageLayout.jsx'
import ProductActions from '../components/ProductActions/ProductActions.jsx'
import ProductDescription from '../components/ProductDescription/ProductDescription.jsx'
import ProductImage from '../components/ProductImage/ProductImage.jsx'
import { useAsync } from '../hooks/useAsync.js'

export default function ProductDetailPage() {
  const { id } = useParams()
  const { value: product, isLoading, hasError } = useAsync(getProductById, id)
  const productName = product && `${product.brand} ${product.model}`

  return (
    <PageLayout productName={productName}>
      <Link to="/" className="mb-8 inline-block text-sm text-neutral-500 transition-colors hover:text-neutral-900">
        ← Back to list
      </Link>
      {isLoading && <p>Loading...</p>}
      {hasError && <p>Something went wrong</p>}
      {product && (
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
          <ProductImage imageUrl={product.imageUrl} name={productName} />
          <section>
            <h1 className="mb-6 text-3xl font-semibold tracking-tight">{productName}</h1>
            <ProductDescription product={product} />
            <ProductActions key={product.id} productId={product.id} colors={product.colors} storages={product.storages} />
          </section>
        </div>
      )}
    </PageLayout>
  )
}
