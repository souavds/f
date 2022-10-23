import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

import { TaskType, useBoardStore } from 'stores/board'
import Card from 'components/Card'
import Icon from 'components/Icon'

type TaskProps = {
  columnId: string
  value: TaskType
}

function Task(props: TaskProps) {
  const { columnId, value } = props

  const { selectTask, selectColumn, removeTask } = useBoardStore(state => ({
    selectTask: state.selectTask,
    selectColumn: state.selectColumn,
    removeTask: state.removeTask
  }))

  const handleEdit = () => {
    selectColumn(columnId)
    selectTask(value)
  }

  const handleRemove = () => {
    removeTask(columnId, value.id)
  }

  return (
    <Card
      title={value.content}
      actions={
        <Menu as='div' className='relative inline-block text-left'>
          <div>
            <Menu.Button className='inline-flex w-full justify-center rounded-md bg-slate-100 p-1'>
              <Icon type='ellipsis' className='fill-current' height={16} width={16} />
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
                    className='text-gray-600 flex w-full items-center rounded-md px-2 py-2 text-xs hover:bg-slate-50'
                    onClick={handleEdit}
                  >
                    <Icon type='pencil' className='fill-current' height={12} width={12} />
                    <span className='ml-2'>Edit</span>
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button
                    className='text-gray-600 flex w-full items-center rounded-md px-2 py-2 text-xs hover:bg-slate-50'
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
