import Header from '../Header/Header.jsx'

export default function PageLayout({ productName, children }) {
  return (
    <>
      <Header productName={productName} />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">{children}</main>
    </>
  )
}
