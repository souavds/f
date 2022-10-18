import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const Home = React.lazy(() => import('./pages/Home'))

const queryClient = new QueryClient()

function Router() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default Router
