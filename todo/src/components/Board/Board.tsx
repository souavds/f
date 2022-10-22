import React from 'react'

type BoardProps = {
  children: React.ReactNode
}

function Board(props: BoardProps) {
  const { children } = props

  return <div className='grid grid-cols-4 gap-4'>{children}</div>
}

export default Board
