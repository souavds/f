import React from 'react'

import { useBoardStore } from 'stores/board'
import Modal from 'components/Modal'

type TaskFormProps = {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

function TaskForm(props: TaskFormProps) {
  const { isOpen, openModal, closeModal } = props

  const { task, column, getColumn, selectColumn, addTaskToColumn, updateTask, resetTask } = useBoardStore(state => ({
    task: state.task,
    column: state.column,
    getColumn: state.getColumn,
    selectColumn: state.selectColumn,
    addTaskToColumn: state.addTaskToColumn,
    updateTask: state.updateTask,
    resetTask: state.resetTask
  }))

  const [value, setValue] = React.useState('')

  const hasTaskSelected = React.useMemo(() => task.id !== '', [task])

  React.useEffect(() => {
    if (hasTaskSelected) {
      openModal()
      setValue(task.content)
    }
  }, [hasTaskSelected, task.content, openModal])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeModal()
    }
    if (event.key === 'Enter') {
      handleAddOrUpdate()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleAddOrUpdate = () => {
    if (hasTaskSelected) updateTask(column, task.id, value)
    else addTaskToColumn(column, value)
    setValue('')
    selectColumn('')
    resetTask()
    closeModal()
  }

  const title = React.useMemo(() => {
    const selectedColumn = getColumn(column)
    return selectedColumn ? selectedColumn.title : ''
  }, [column, getColumn])

  return (
    <Modal
      title={
        <span>
          {hasTaskSelected ? (
            `${task.content}`
          ) : (
            <>
              Add task to <strong>{title}</strong>
            </>
          )}
        </span>
      }
      actions={
        <button
          className='flex items-center float-right rounded-md border border-transparent bg-indigo-600 px-6 py-1 text-base font-medium text-white hover:bg-indigo-700'
          onClick={handleAddOrUpdate}
        >
          {hasTaskSelected ? 'Update' : 'Add'}
        </button>
      }
      isOpen={isOpen}
      onClose={closeModal}
    >
      <input
        type='text'
        name='taskName'
        className='mt-4 p-2 w-full rounded-md border-zinc-300 focus:border-indigo-500 focus:ring-indigo-500'
        placeholder='Task name'
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </Modal>
  )
}

export default TaskForm
