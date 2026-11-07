import { useEffect, useState } from 'react'
import { getProductById } from '../api/products.js'

export function useProduct(id) {
  const [result, setResult] = useState({ id: null, product: null, hasError: false })

  useEffect(() => {
    let isCancelled = false
    getProductById(id).then(
      (product) => !isCancelled && setResult({ id, product, hasError: false }),
      () => !isCancelled && setResult({ id, product: null, hasError: true }),
    )
    return () => {
      isCancelled = true
    }
  }, [id])

  const isCurrent = result.id === id
  return {
    product: isCurrent ? result.product : null,
    isLoading: !isCurrent,
    hasError: isCurrent && result.hasError,
  }
}
