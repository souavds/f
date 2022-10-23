import React from 'react'
import { useDndMonitor } from '@dnd-kit/core'

import { useBoardStore } from 'stores/board'
import { useModal } from 'components/Modal'
import Column from 'components/Column'

import TaskForm from './components/TaskForm'

function Board() {
  const { columns, selectColumn, moveTask } = useBoardStore(state => ({
    columns: state.columns,
    selectColumn: state.selectColumn,
    moveTask: state.moveTask
  }))

  useDndMonitor({
    onDragEnd(event) {
      const { active, over } = event

      if (over) {
        const { data: from } = active
        const { data: to } = over

        const columnId = from.current!.columnId
        const toColumnId = to.current!.columnId
        const taskId = from.current!.task.id

        if (columnId !== toColumnId) {
          moveTask(columnId, toColumnId, taskId)
        }
      }
    }
  })

  const { isOpen, openModal, closeModal } = useModal()

  const columnsIds = React.useMemo(() => {
    return Object.keys(columns)
  }, [columns])

  const handleAddTask = (id: string) => {
    selectColumn(id)
    openModal()
  }

  return (
    <div className={`grid grid-cols-4 gap-4 p-4 min-h-fit h-full rounded-md bg-zinc-50`}>
      {columnsIds.map(id => (
        <Column key={id} id={id} onAddTask={handleAddTask} />
      ))}
      <TaskForm isOpen={isOpen} openModal={openModal} closeModal={closeModal} />
    </div>
  )
}

export default Board
