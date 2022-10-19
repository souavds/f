import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import globalStyles from 'theme/global'

const Home = React.lazy(() => import('pages/Home'))

const queryClient = new QueryClient()

function Router() {
  globalStyles()

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default Router
