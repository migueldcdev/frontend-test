import { useEffect, useState } from 'react'

export function useAsync(load, argument) {
  const [result, setResult] = useState(null)

  useEffect(() => {
    let isCancelled = false
    load(argument).then(
      (value) => !isCancelled && setResult({ argument, value, hasError: false }),
      () => !isCancelled && setResult({ argument, value: null, hasError: true }),
    )
    return () => {
      isCancelled = true
    }
  }, [load, argument])

  const isCurrent = result !== null && result.argument === argument
  return {
    value: isCurrent ? result.value : null,
    isLoading: !isCurrent,
    hasError: isCurrent && result.hasError,
  }
}
