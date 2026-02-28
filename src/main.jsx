import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import KickTrack from '../kicktrack.jsx'

// Polyfill window.storage → localStorage
// (compatible avec le format attendu par l'app)
window.storage = {
  get: async (key) => {
    const value = localStorage.getItem(key)
    return value !== null ? { value } : null
  },
  set: async (key, value) => {
    localStorage.setItem(key, value)
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <KickTrack />
  </StrictMode>
)
