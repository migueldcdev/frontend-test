import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CartProvider } from '../../context/CartContext.jsx'
import ProductActions from './ProductActions.jsx'

const black = { code: 1000, name: 'Black' }
const white = { code: 1001, name: 'White' }
const small = { code: 2000, name: '16 GB' }
const large = { code: 2001, name: '32 GB' }

function addButton() {
  return screen.getByRole('button', { name: 'Add to cart' })
}

describe('ProductActions', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('preselects an option when it is the only one available', () => {
    render(<ProductActions productId="abc" colors={[black]} storages={[small, large]} />, { wrapper: CartProvider })

    expect(screen.getByLabelText('Color').value).toBe('1000')
    expect(screen.getByLabelText('Storage').value).toBe('')
  })

  it('enables the add button only once color and storage are selected', () => {
    render(<ProductActions productId="abc" colors={[black, white]} storages={[small, large]} />, { wrapper: CartProvider })

    expect(addButton().disabled).toBe(true)
    fireEvent.change(screen.getByLabelText('Color'), { target: { value: '1001' } })
    expect(addButton().disabled).toBe(true)
    fireEvent.change(screen.getByLabelText('Storage'), { target: { value: '2001' } })
    expect(addButton().disabled).toBe(false)
  })

  it('sends a single request when add is clicked again while pending', async () => {
    const fetchMock = vi.fn(() => Promise.resolve(Response.json({ count: 1 })))
    vi.stubGlobal('fetch', fetchMock)
    render(<ProductActions productId="abc" colors={[black]} storages={[small]} />, { wrapper: CartProvider })

    fireEvent.click(addButton())
    fireEvent.click(addButton())
    await waitFor(() => expect(addButton().disabled).toBe(false))

    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
})
