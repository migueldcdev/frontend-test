export default function ProductDescription({ product }) {
  const attributes = [
    ['Brand', product.brand],
    ['Model', product.model],
    ['Price', product.price && `${product.price} €`],
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
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
      {attributes.map(([label, value]) => (
        <div key={label} className="contents">
          <dt className="font-semibold">{label}</dt>
          <dd>{value || '-'}</dd>
        </div>
      ))}
    </dl>
  )
}
