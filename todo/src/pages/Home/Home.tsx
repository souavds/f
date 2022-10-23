import React from 'react'

import Board from 'components/Board'

function Home() {
  return (
    <div className='p-10 h-full'>
      <h1 className='text-2xl font-bold py-6'>To-do App</h1>
      <Board />
    </div>
  )
}

export default Home
