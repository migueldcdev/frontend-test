import { createContext, useContext, useEffect, useState } from 'react'

const CART_COUNT_KEY = 'cartCount'

const CartContext = createContext(null)

function readStoredCount() {
  try {
    return Number(localStorage.getItem(CART_COUNT_KEY)) || 0
  } catch {
    return 0
  }
}

export function CartProvider({ children }) {
  const [count, setCount] = useState(readStoredCount)

  useEffect(() => {
    try {
      localStorage.setItem(CART_COUNT_KEY, String(count))
    } catch {
      // Storage unavailable: the count still works for this session.
    }
  }, [count])

  const addToCount = (added) => setCount((current) => current + added)

  return <CartContext.Provider value={{ count, addToCount }}>{children}</CartContext.Provider>
}

export function useCart() {
  return useContext(CartContext)
}
