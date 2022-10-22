import React from 'react'

type ColumnProps = {
  title: string
  children?: React.ReactNode
}

function Column(props: ColumnProps) {
  const { children, title } = props

  return (
    <div className='flex flex-1 flex-col bg-slate-200 rounded-md'>
      <div className='py-2 px-4'>
        <h2 className='font-bold text-sm'>
          {title} <span className='text-xs mx-2 p-1 bg-slate-300 rounded-full'>3</span>
        </h2>
      </div>
      <hr className='w-full h-1 bg-white' />
      <div className='py-4 px-6'>{children}</div>
    </div>
  )
}

export default Column
