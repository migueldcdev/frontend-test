import Header from '../Header/Header.jsx'

export default function PageLayout({ productName, children }) {
  return (
    <>
      <Header productName={productName} />
      <main className="mx-auto max-w-6xl p-4">{children}</main>
    </>
  )
}
