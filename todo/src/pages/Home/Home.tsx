import React from 'react'

import Board from 'components/Board'
import Column from 'components/Column'

function Home() {
  return (
    <div>
      <h1>To-do App</h1>
      <Board>
        <Column title='Backlog'></Column>
        <Column title='Todo'></Column>
        <Column title='Ongoing'></Column>
        <Column title='Team review'></Column>
      </Board>
    </div>
  )
}

export default Home
