import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './pages/Home.tsx'
import Coach from './pages/Coach.tsx'
import Child from './pages/Child.tsx'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/coach', element: <Coach /> },
  { path: '/child', element: <Child /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
