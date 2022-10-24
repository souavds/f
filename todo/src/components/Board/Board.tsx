import React from 'react'
import { useDndMonitor } from '@dnd-kit/core'

import { useBoardStore } from 'stores/board'
import Column from 'components/Column'

import TaskForm from './components/TaskForm'

function Board() {
  const { columns, moveTask } = useBoardStore(state => ({
    columns: state.columns,
    moveTask: state.moveTask
  }))

  useDndMonitor({
    onDragEnd(event) {
      const { active, over } = event

      if (over) {
        const { data: from } = active
        const { data: to } = over

        const columnId = from.current?.columnId
        const toColumnId = to.current?.columnId
        const taskId = from.current?.task.id

        if (columnId !== toColumnId) {
          moveTask(columnId, toColumnId, taskId)
        }
      }
    }
  })

  const columnsIds = React.useMemo(() => {
    return Object.keys(columns)
  }, [columns])

  return (
    <div className='grid grid-cols-4 gap-4 p-4 min-h-fit h-full rounded-md bg-zinc-50'>
      {columnsIds.map(id => (
        <Column key={id} id={id} />
      ))}
      <TaskForm />
    </div>
  )
}

export default Board
