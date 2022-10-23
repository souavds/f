import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { DndContext } from '@dnd-kit/core'

const Home = React.lazy(() => import('pages/Home'))

function Router() {
  return (
    <DndContext>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </DndContext>
  )
}

export default Router
