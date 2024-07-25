import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import Validator from './Validator.tsx'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'
import NotFound from './pages/NotFound.tsx'
import Home from './pages/Home.tsx'

import { createHashRouter, RouterProvider } from 'react-router-dom'

const router = createHashRouter([
  {
    path: '/',
    element: <Validator><App /></Validator>,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)