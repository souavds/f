import React from 'react'

type CardProps = {
  title: string
  actions?: React.ReactNode
  children?: React.ReactNode
} & React.ComponentPropsWithoutRef<'div'>

const Card = React.forwardRef((props: CardProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  const { title, actions, children, ...rest } = props

  return (
    <div ref={ref} className='flex flex-col bg-white rounded-md' {...rest}>
      <div className='flex justify-between py-2 px-4'>
        <h2 className='font-bold text-sm'>{title}</h2>
        {actions}
      </div>
      {children && <div className='flex flex-col gap-2 py-4 px-4'>{children}</div>}
    </div>
  )
})

export default Card
