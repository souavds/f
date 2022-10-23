import React from 'react'

import { useBoardStore } from 'stores/board'
import Icon from 'components/Icon'
import Task from 'components/Task'

type ColumnProps = {
  id: string
  onAddTask: (columnId: string) => void
}

function Column(props: ColumnProps) {
  const { id, onAddTask } = props

  const { getColumn, countTaskByColumn } = useBoardStore(state => ({
    getColumn: state.getColumn,
    countTaskByColumn: state.countTaskByColumn,
    addTaskToColumn: state.addTaskToColumn
  }))

  const column = getColumn(id)

  const tasks = React.useMemo(() => {
    return Object.values(column.tasks)
  }, [column])

  return (
    <div className='flex flex-col h-fit bg-slate-200 rounded-md'>
      <div className='py-2 px-4'>
        <h2 className='font-bold text-sm'>
          {column.title} <span className='text-xs mx-2 p-1 bg-slate-300 rounded-full'>{countTaskByColumn(id)}</span>
        </h2>
      </div>
      <hr className='w-full h-1 bg-white' />
      <div className='flex flex-col gap-2 py-4 px-4'>
        <button
          className='flex justify-center py-2 w-full bg-slate-300 border border-slate-400 rounded'
          onClick={() => onAddTask(id)}
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
