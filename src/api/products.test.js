import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { addToCart, getProductById, getProducts } from './products.js'

const ONE_HOUR_MS = 60 * 60 * 1000

const apiProduct = {
  id: 'abc',
  brand: 'Acer',
  model: 'Liquid Z6',
  price: '120',
  imgUrl: 'https://example.com/abc.jpg',
  cpu: 'Quad-core 1.3 GHz',
  ram: '2 GB RAM',
  os: 'Android 6.0',
  displayResolution: '5.5 inches',
  displaySize: '720 x 1280 pixels',
  battery: '4080 mAh',
  primaryCamera: ['13 MP', 'autofocus'],
  secondaryCmera: '5 MP',
  dimentions: '153 x 76 x 8.5 mm',
  weight: '169',
  options: {
    colors: [{ code: 1000, name: 'Black' }],
    storages: [{ code: 2000, name: '16 GB' }],
  },
}

function respondWith(body, status = 200) {
  const fetchMock = vi.fn(() => Promise.resolve(Response.json(body, { status })))
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

describe('products api', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('serves a second call from the cache', async () => {
    const fetchMock = respondWith([apiProduct])

    await getProducts()
    const products = await getProducts()

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(products).toEqual([
      { id: 'abc', brand: 'Acer', model: 'Liquid Z6', price: '120', imageUrl: 'https://example.com/abc.jpg' },
    ])
  })

  it('refetches once the cache has expired', async () => {
    const fetchMock = respondWith([apiProduct])

    await getProducts()
    vi.advanceTimersByTime(ONE_HOUR_MS)
    await getProducts()

    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('maps the product detail to clean field names', async () => {
    respondWith(apiProduct)

    expect(await getProductById('abc')).toEqual({
      id: 'abc',
      brand: 'Acer',
      model: 'Liquid Z6',
      price: '120',
      imageUrl: 'https://example.com/abc.jpg',
      cpu: 'Quad-core 1.3 GHz',
      ram: '2 GB RAM',
      os: 'Android 6.0',
      screenResolution: '720 x 1280 pixels',
      battery: '4080 mAh',
      primaryCamera: '13 MP, autofocus',
      secondaryCamera: '5 MP',
      dimensions: '153 x 76 x 8.5 mm',
      weight: '169',
      colors: [{ code: 1000, name: 'Black' }],
      storages: [{ code: 2000, name: '16 GB' }],
    })
  })

  it('rejects when the response is not ok', async () => {
    respondWith({}, 500)

    await expect(getProducts()).rejects.toThrow('status 500')
  })

  it('posts the cart payload and returns the count', async () => {
    const fetchMock = respondWith({ count: 3 })

    const count = await addToCart({ id: 'abc', colorCode: 1000, storageCode: 2000 })

    expect(count).toBe(3)
    expect(fetchMock).toHaveBeenCalledWith(
      'https://itx-frontend-test.onrender.com/api/cart',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ id: 'abc', colorCode: 1000, storageCode: 2000 }),
      }),
    )
  })
})
