import { useState } from 'react'
import OptionSelect from './OptionSelect.jsx'

function defaultCode(options) {
  return options.length === 1 ? options[0].code : null
}

export default function ProductActions({ colors, storages }) {
  const [colorCode, setColorCode] = useState(() => defaultCode(colors))
  const [storageCode, setStorageCode] = useState(() => defaultCode(storages))
  const isSelectionComplete = colorCode !== null && storageCode !== null

  return (
    <div className="mt-6 flex flex-col gap-4">
      <OptionSelect label="Color" options={colors} selectedCode={colorCode} onSelect={setColorCode} />
      <OptionSelect label="Storage" options={storages} selectedCode={storageCode} onSelect={setStorageCode} />
      <button
        type="button"
        disabled={!isSelectionComplete}
        className="rounded bg-black px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        Add to cart
      </button>
    </div>
  )
}
