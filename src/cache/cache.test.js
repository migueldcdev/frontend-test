import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getCached, setCached } from './cache.js'

const ONE_HOUR_MS = 60 * 60 * 1000

describe('cache', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('returns the stored value within the TTL', () => {
    setCached('products', [{ id: '1' }])
    vi.advanceTimersByTime(ONE_HOUR_MS - 1)

    expect(getCached('products')).toEqual([{ id: '1' }])
  })

  it('returns null for a missing key', () => {
    expect(getCached('products')).toBeNull()
  })

  it('returns null and removes the entry once the TTL has passed', () => {
    setCached('products', [{ id: '1' }])
    vi.advanceTimersByTime(ONE_HOUR_MS)

    expect(getCached('products')).toBeNull()
    expect(localStorage.getItem('cache:products')).toBeNull()
  })

  it('returns null and removes the entry for corrupted JSON', () => {
    localStorage.setItem('cache:products', '{not json')

    expect(getCached('products')).toBeNull()
    expect(localStorage.getItem('cache:products')).toBeNull()
  })

  it('does not store undefined values', () => {
    setCached('products', undefined)

    expect(localStorage.getItem('cache:products')).toBeNull()
  })

  it('returns null when storage is unavailable', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError')
    })

    expect(getCached('products')).toBeNull()
  })

  it('ignores write failures', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError')
    })

    expect(() => setCached('products', [])).not.toThrow()
  })
})
