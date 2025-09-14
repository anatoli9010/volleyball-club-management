import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './pages/Home.tsx'
import Coach from './pages/Coach.tsx'
import Child from './pages/Child.tsx'
import ProfilesPage from './pages/Profiles.tsx'
import { ProfilesProvider } from './context/ProfilesContext'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/coach', element: <Coach /> },
  { path: '/child', element: <Child /> },
  { path: '/profiles', element: <ProfilesPage /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProfilesProvider>
      <RouterProvider router={router} />
    </ProfilesProvider>
  </StrictMode>,
)
