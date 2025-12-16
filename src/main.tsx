import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Note: React Query is installed and configured in src/providers/QueryProvider.tsx
// To enable React Query, wrap App with QueryProvider when React 19 compatibility is stable:
// import { QueryProvider } from './providers/QueryProvider'
// <QueryProvider><App /></QueryProvider>

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
