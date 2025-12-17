import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { router } from './router'
import './index.css'

// Note: React Query is installed and configured in src/providers/QueryProvider.tsx
// To enable React Query, wrap with QueryProvider when React 19 compatibility is stable

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
