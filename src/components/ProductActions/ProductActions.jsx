import { useState } from 'react'
import { addToCart } from '../../api/products.js'
import { useCart } from '../../context/CartContext.jsx'
import OptionSelect from './OptionSelect.jsx'

function defaultCode(options) {
  return options.length === 1 ? options[0].code : null
}

export default function ProductActions({ productId, colors, storages }) {
  const { addToCount } = useCart()
  const [colorCode, setColorCode] = useState(() => defaultCode(colors))
  const [storageCode, setStorageCode] = useState(() => defaultCode(storages))
  const [hasAddFailed, setHasAddFailed] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const isSelectionComplete = colorCode !== null && storageCode !== null

  async function addSelectionToCart() {
    setIsAdding(true)
    try {
      addToCount(await addToCart({ id: productId, colorCode, storageCode }))
      setHasAddFailed(false)
    } catch {
      setHasAddFailed(true)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="mt-6 flex flex-col gap-4">
      <OptionSelect label="Color" options={colors} selectedCode={colorCode} onSelect={setColorCode} />
      <OptionSelect label="Storage" options={storages} selectedCode={storageCode} onSelect={setStorageCode} />
      <button
        type="button"
        disabled={!isSelectionComplete || isAdding}
        onClick={addSelectionToCart}
        className="rounded bg-black px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        Add to cart
      </button>
      {hasAddFailed && <p role="alert" className="text-red-600">Something went wrong</p>}
    </div>
  )
}
