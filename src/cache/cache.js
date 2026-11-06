const TTL_MS = 60 * 60 * 1000
const PREFIX = 'cache:'

export function getCached(key) {
  const storageKey = PREFIX + key
  try {
    const entry = JSON.parse(localStorage.getItem(storageKey))
    if (entry && Date.now() - entry.savedAt < TTL_MS) {
      return entry.value
    }
    localStorage.removeItem(storageKey)
  } catch {
    try {
      localStorage.removeItem(storageKey)
    } catch {
      // Storage unavailable: nothing to clean up.
    }
  }
  return null
}

export function setCached(key, value) {
  if (value === undefined) return
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify({ value, savedAt: Date.now() }))
  } catch {
    // Storage full or unavailable: caching is best effort.
  }
}
