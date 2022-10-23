import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

type DropdownProps = {
  action: React.ReactNode
  children: React.ReactNode
}

function Dropdown(props: DropdownProps) {
  const { action, children } = props

  return (
    <Menu as='div' className='relative inline-block text-left'>
      {action}
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute z-10 left-0 mt-2 w-32 origin-top-right divide-y rounded-md shadow-sm bg-white'>
          <div className='px-1 py-1'>{children}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdown
