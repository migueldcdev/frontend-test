export default function ProductDescription({ product }) {
  const attributes = [
    ['Brand', product.brand],
    ['Model', product.model],
    ['Price', product.price ? `${product.price} €` : '-'],
    ['CPU', product.cpu],
    ['RAM', product.ram],
    ['Operating system', product.os],
    ['Screen resolution', product.screenResolution],
    ['Battery', product.battery],
    ['Primary camera', product.primaryCamera],
    ['Secondary camera', product.secondaryCamera],
    ['Dimensions', product.dimensions],
    ['Weight', product.weight && `${product.weight} g`],
  ]

  return (
    <dl className="divide-y divide-neutral-200/70 text-sm">
      {attributes.map(([label, value]) => (
        <div key={label} className="flex justify-between gap-4 py-2.5">
          <dt className="text-neutral-500">{label}</dt>
          <dd className="text-right">{value || '-'}</dd>
        </div>
      ))}
    </dl>
  )
}
