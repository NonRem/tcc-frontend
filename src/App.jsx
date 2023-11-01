import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import router from './routes'
import { RouterProvider } from 'react-router-dom'

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
