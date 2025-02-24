import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './utils/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/dhs-panel'>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
)
