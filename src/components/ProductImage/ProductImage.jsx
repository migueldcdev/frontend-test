export default function ProductImage({ imageUrl, name }) {
  return <img src={imageUrl} alt={name} className="mx-auto w-full max-w-sm object-contain" />
}
