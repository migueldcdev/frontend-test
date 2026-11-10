export default function ProductImage({ imageUrl, name }) {
  return <img src={imageUrl} alt={name} className="mx-auto w-full max-w-sm rounded-3xl bg-white object-contain p-8" />
}
