import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ProductActions from './ProductActions.jsx'

const black = { code: 1000, name: 'Black' }
const white = { code: 1001, name: 'White' }
const small = { code: 2000, name: '16 GB' }
const large = { code: 2001, name: '32 GB' }

function addButton() {
  return screen.getByRole('button', { name: 'Add to cart' })
}

describe('ProductActions', () => {
  it('preselects an option when it is the only one available', () => {
    render(<ProductActions colors={[black]} storages={[small, large]} />)

    expect(screen.getByLabelText('Color').value).toBe('1000')
    expect(screen.getByLabelText('Storage').value).toBe('')
  })

  it('enables the add button only once color and storage are selected', () => {
    render(<ProductActions colors={[black, white]} storages={[small, large]} />)

    expect(addButton().disabled).toBe(true)
    fireEvent.change(screen.getByLabelText('Color'), { target: { value: '1001' } })
    expect(addButton().disabled).toBe(true)
    fireEvent.change(screen.getByLabelText('Storage'), { target: { value: '2001' } })
    expect(addButton().disabled).toBe(false)
  })
})
