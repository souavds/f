import React from 'react'
import { useDroppable } from '@dnd-kit/core'

import { useBoardStore } from 'stores/board'
import { useTaskFormStore } from 'stores/task-form'
import Icon from 'components/Icon'
import Task from 'components/Task'

type ColumnProps = {
  id: string
}

function Column(props: ColumnProps) {
  const { id } = props

  // useQuery here for getting the column data and tasks

  const { isOver, setNodeRef } = useDroppable({
    id,
    data: {
      columnId: id
    }
  })

  const { setColumnId, toggle } = useTaskFormStore(state => ({
    setColumnId: state.setColumnId,
    toggle: state.toggle
  }))

  const { getColumnById, countTasksByColumn } = useBoardStore(state => ({
    getColumnById: state.getColumnById,
    countTasksByColumn: state.countTasksByColumn
  }))

  const handleAdd = () => {
    setColumnId(id)
    toggle()
  }

  const column = getColumnById(id)

  const tasks = React.useMemo(() => {
    return Object.values(column.tasks)
  }, [column])

  return (
    <div
      className={`flex flex-col h-fit rounded-md transition-colors ${isOver ? 'bg-zinc-100' : 'bg-zinc-200'}`}
      ref={setNodeRef}
    >
      <div className='py-2 px-4'>
        <h2 className='font-bold text-sm'>
          {column.title} <span className='text-xs mx-2 p-1 bg-zinc-300 rounded-full'>{countTasksByColumn(id)}</span>
        </h2>
      </div>
      <hr className='w-full h-1 bg-zinc-50' />
      <div className='flex flex-col gap-2 py-4 px-4'>
        <button
          className='flex justify-center py-2 w-full bg-zinc-300 border border-zinc-400 rounded'
          onClick={handleAdd}
          aria-label='Add task'
        >
          <Icon type='plus' className='fill-current' height={16} width={16} />
        </button>
        <div className='flex flex-col gap-2'>
          {tasks.map(task => (
            <Task key={task.id} columnId={id} value={task} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Column
