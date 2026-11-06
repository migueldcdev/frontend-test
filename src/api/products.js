import { getCached, setCached } from '../cache/cache.js'
import { request } from './client.js'

function joinList(value) {
  return Array.isArray(value) ? value.join(', ') : value
}

function toProductSummary({ id, brand, model, price, imgUrl }) {
  return { id, brand, model, price, imageUrl: imgUrl }
}

function toProductDetail(product) {
  return {
    ...toProductSummary(product),
    cpu: product.cpu,
    ram: product.ram,
    os: joinList(product.os),
    // The API swaps these: displaySize holds the resolution, displayResolution the size.
    screenResolution: product.displaySize,
    battery: product.battery,
    primaryCamera: joinList(product.primaryCamera),
    secondaryCamera: joinList(product.secondaryCmera),
    dimensions: product.dimentions,
    weight: product.weight,
    colors: product.options.colors,
    storages: product.options.storages,
  }
}

async function getWithCache(cacheKey, path, toValue) {
  const cached = getCached(cacheKey)
  if (cached !== null) return cached
  const value = toValue(await request(path))
  setCached(cacheKey, value)
  return value
}

export function getProducts() {
  return getWithCache('products', '/api/product', (products) => products.map(toProductSummary))
}

export function getProductById(id) {
  return getWithCache(`product:${id}`, `/api/product/${id}`, toProductDetail)
}

export async function addToCart({ id, colorCode, storageCode }) {
  const { count } = await request('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, colorCode, storageCode }),
  })
  return count
}
