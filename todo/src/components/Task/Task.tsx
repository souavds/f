import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useDraggable } from '@dnd-kit/core'

import { TaskType, useBoardStore } from 'stores/board'
import { useTaskFormStore } from 'stores/task-form'
import Card from 'components/Card'
import Icon from 'components/Icon'

type TaskProps = {
  columnId: string
  value: TaskType
}

function Task(props: TaskProps) {
  const { columnId, value } = props

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: value.id,
    data: {
      columnId,
      task: value
    }
  })

  const { setTask, setColumnId, toggle } = useTaskFormStore(state => ({
    setTask: state.setTask,
    setColumnId: state.setColumnId,
    toggle: state.toggle
  }))

  const { removeTask } = useBoardStore(state => ({
    removeTask: state.removeTask
  }))

  const handleEdit = () => {
    setColumnId(columnId)
    setTask(value)
    toggle()
  }

  const handleRemove = () => {
    removeTask(columnId, value.id)
  }

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
      }
    : undefined

  return (
    <Card
      ref={setNodeRef}
      className={isDragging ? 'shadow-sm z-50' : ''}
      cardTitle={
        <span className='w-full cursor-pointer' onClick={handleEdit}>
          {value.content}
        </span>
      }
      style={style}
      actions={
        <Menu as='div' className='relative inline-block text-left'>
          <div className='flex gap-2'>
            <Menu.Button
              className='inline-flex w-full justify-center rounded-md bg-zinc-100 p-1'
              {...listeners}
              {...attributes}
            >
              <Icon type='move' className='fill-current' height={14} width={14} />
            </Menu.Button>
            <Menu.Button className='inline-flex w-full justify-center rounded-md bg-zinc-100 p-1'>
              <Icon type='ellipsis' className='fill-current' height={14} width={14} />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute z-10 left-0 mt-2 w-fit origin-top-right divide-y rounded-md shadow-sm bg-white'>
              <div className='px-1 py-1'>
                <Menu.Item>
                  <button
                    className='text-zinc-600 flex w-full items-center rounded-md px-2 py-2 text-xs hover:bg-zinc-100'
                    onClick={handleEdit}
                  >
                    <Icon type='pencil' className='fill-current' height={12} width={12} />
                    <span className='ml-2'>Edit</span>
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button
                    className='text-zinc-600 flex w-full items-center rounded-md px-2 py-2 text-xs hover:bg-zinc-100'
                    onClick={handleRemove}
                  >
                    <Icon type='trash' className='fill-current' height={12} width={12} />
                    <span className='ml-2'>Remove</span>
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      }
    />
  )
}

export default Task
