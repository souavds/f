import React from 'react'

import { useBoardStore } from 'stores/board'
import { useTaskFormStore } from 'stores/task-form'
import Modal from 'components/Modal'

function TaskForm() {
  const { isOpen, columnId, task, reset } = useTaskFormStore(state => ({
    isOpen: state.isOpen,
    columnId: state.columnId,
    task: state.task,
    reset: state.reset
  }))

  const { getColumnById, addTask, updateTask } = useBoardStore(state => ({
    getColumnById: state.getColumnById,
    addTask: state.addTask,
    updateTask: state.updateTask
  }))

  const [value, setValue] = React.useState('')

  const hasTaskSelected = React.useMemo(() => task.id !== '' && task.content !== '', [task.id, task.content])

  React.useEffect(() => {
    if (hasTaskSelected) {
      setValue(task.content)
    }
  }, [hasTaskSelected, task.content])

  const handleClose = () => {
    setValue('')
    reset()
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleClose()
    }
    if (event.key === 'Enter') {
      handleAddOrUpdate()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleAddOrUpdate = () => {
    if (hasTaskSelected) updateTask(columnId, task.id, value)
    else addTask(columnId, value)
    handleClose()
  }

  const title = React.useMemo(() => {
    const selectedColumn = getColumnById(columnId)
    return selectedColumn ? selectedColumn.title : ''
  }, [columnId, getColumnById])

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
      onClose={handleClose}
    >
      <input
        type='text'
        name='taskName'
        className='mt-4 p-2 w-full rounded-md border-zinc-300 focus:border-indigo-500 focus:ring-indigo-500'
        placeholder='Task name'
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
      />
    </Modal>
  )
}

export default TaskForm
