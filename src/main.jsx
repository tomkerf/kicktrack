import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import KickTrack from '../kicktrack.jsx'

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBFVXFDPxZnpHuYsQoQMjcFiDgCEJATrhg",
  authDomain: "kicktrack-bd2d1.firebaseapp.com",
  projectId: "kicktrack-bd2d1",
  storageBucket: "kicktrack-bd2d1.firebasestorage.app",
  messagingSenderId: "1005410418651",
  appId: "1:1005410418651:web:752299bdfc45e45447b1fe",
  measurementId: "G-0V8P7GFPZ9"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const userRef = doc(db, 'kicktrack', 'titouan')

// Cache local pour éviter trop d'appels Firestore
let cache = null

// window.storage → Firestore (données synchronisées entre tous les appareils)
window.storage = {
  get: async (key) => {
    if (!cache) {
      const snap = await getDoc(userRef)
      cache = snap.exists() ? snap.data() : {}
    }
    return cache[key] !== undefined ? { value: cache[key] } : null
  },
  set: async (key, value) => {
    if (!cache) cache = {}
    cache[key] = value
    await setDoc(userRef, { [key]: value }, { merge: true })
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <KickTrack />
  </StrictMode>
)
