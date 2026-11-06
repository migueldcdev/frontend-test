import { useEffect, useState } from 'react'
import { getProductById } from '../api/products.js'

export function useProduct(id) {
  const [product, setProduct] = useState(null)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    getProductById(id).then(setProduct, () => setHasError(true))
  }, [id])

  return { product, isLoading: product === null && !hasError, hasError }
}
