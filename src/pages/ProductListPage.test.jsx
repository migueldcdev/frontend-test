import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CartProvider } from '../context/CartContext.jsx'
import ProductListPage from './ProductListPage.jsx'

const apiProducts = [
  { id: '1', brand: 'Acer', model: 'Liquid Z6', price: '120', imgUrl: 'https://example.com/1.jpg' },
  { id: '2', brand: 'Samsung', model: 'Galaxy S8', price: '', imgUrl: 'https://example.com/2.jpg' },
]

async function renderLoadedPage() {
  render(
    <MemoryRouter>
      <CartProvider>
        <ProductListPage />
      </CartProvider>
    </MemoryRouter>,
  )
  await screen.findByRole('link', { name: /Acer Liquid Z6/ })
}

function search(query) {
  fireEvent.change(screen.getByLabelText('Search by brand or model'), { target: { value: query } })
}

describe('ProductListPage search', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve(Response.json(apiProducts))))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('filters products by brand or model as the user types', async () => {
    await renderLoadedPage()

    search('  GALAXY ')

    expect(screen.getByRole('link', { name: /Samsung Galaxy S8/ })).toBeDefined()
    expect(screen.queryByRole('link', { name: /Acer Liquid Z6/ })).toBeNull()
  })

  it('shows a message when no product matches', async () => {
    await renderLoadedPage()

    search('nokia')

    expect(screen.getByText('No products found')).toBeDefined()
    expect(screen.queryByRole('link', { name: /Acer|Samsung/ })).toBeNull()
  })
})
