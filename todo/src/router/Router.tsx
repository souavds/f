import React from 'react'
import { Routes, Route } from 'react-router-dom'

const Home = React.lazy(() => import('pages/Home'))

function Router() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  )
}

export default Router
