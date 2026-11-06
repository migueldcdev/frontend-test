import { useEffect, useState } from 'react'
import { getProducts } from '../api/products.js'

export function useProducts() {
  const [products, setProducts] = useState(null)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    getProducts().then(setProducts, () => setHasError(true))
  }, [])

  return { products, isLoading: products === null && !hasError, hasError }
}
