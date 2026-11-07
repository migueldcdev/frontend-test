const TTL_MS = 60 * 60 * 1000
const PREFIX = 'cache:'

function readEntry(storageKey) {
  try {
    return JSON.parse(localStorage.getItem(storageKey))
  } catch {
    return null
  }
}

export function getCached(key) {
  const storageKey = PREFIX + key
  const entry = readEntry(storageKey)
  if (entry && Date.now() - entry.savedAt < TTL_MS) return entry.value
  try {
    localStorage.removeItem(storageKey)
  } catch {
    // Storage unavailable: nothing to clean up.
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
