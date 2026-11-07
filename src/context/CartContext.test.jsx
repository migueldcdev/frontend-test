import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Header from '../components/Header/Header.jsx'
import ProductActions from '../components/ProductActions/ProductActions.jsx'
import { CartProvider } from './CartContext.jsx'

const colors = [{ code: 1000, name: 'Black' }]
const storages = [{ code: 2000, name: '16 GB' }]

function renderShop() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <Header />
        <ProductActions productId="abc" colors={colors} storages={storages} />
      </CartProvider>
    </MemoryRouter>,
  )
}

describe('Cart count', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve(Response.json({ count: 1 }))))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('adds the returned count to the total after each add to cart', async () => {
    renderShop()

    fireEvent.click(screen.getByRole('button', { name: 'Add to cart' }))
    expect(await screen.findByText('Cart: 1')).toBeDefined()
    fireEvent.click(screen.getByRole('button', { name: 'Add to cart' }))
    expect(await screen.findByText('Cart: 2')).toBeDefined()
  })

  it('keeps the count after a reload', async () => {
    const { unmount } = renderShop()
    fireEvent.click(screen.getByRole('button', { name: 'Add to cart' }))
    await screen.findByText('Cart: 1')
    unmount()

    renderShop()

    expect(screen.getByText('Cart: 1')).toBeDefined()
  })
})
