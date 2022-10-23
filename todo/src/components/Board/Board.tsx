import React from 'react'

import { useBoardStore } from 'stores/board'
import { useModal } from 'components/Modal'
import Column from 'components/Column'

import TaskForm from './components/TaskForm'

function Board() {
  const { columns, selectColumn } = useBoardStore(state => ({
    columns: state.columns,
    selectColumn: state.selectColumn
  }))

  const { isOpen, openModal, closeModal } = useModal()

  const columnsIds = React.useMemo(() => {
    return Object.keys(columns)
  }, [columns])

  const handleAddTask = (id: string) => {
    selectColumn(id)
    openModal()
  }

  return (
    <div className={`grid grid-cols-4 gap-4 p-4 min-h-fit h-full rounded-md bg-slate-100`}>
      {columnsIds.map(id => (
        <Column key={id} id={id} onAddTask={handleAddTask} />
      ))}
      <TaskForm isOpen={isOpen} openModal={openModal} closeModal={closeModal} />
    </div>
  )
}

export default Board
