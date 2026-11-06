const API_URL = import.meta.env.VITE_API_URL || 'https://itx-frontend-test.onrender.com'

export async function request(path, options) {
  const response = await fetch(API_URL + path, options)
  if (!response.ok) throw new Error(`Request to ${path} failed with status ${response.status}`)
  return response.json()
}
