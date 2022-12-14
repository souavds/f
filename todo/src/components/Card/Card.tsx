/* eslint-disable react/prop-types */
import React from 'react'

type CardProps = {
  cardTitle: React.ReactNode
  actions?: React.ReactNode
  children?: React.ReactNode
} & React.ComponentPropsWithoutRef<'div'>

const Card = React.forwardRef((props: CardProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  const { cardTitle, actions, children, className, ...rest } = props

  return (
    <div ref={ref} className={`flex flex-col bg-white rounded-md transition-shadow ${className ?? ''}`} {...rest}>
      <div className='flex justify-between py-2 px-4'>
        <h2 className='flex items-center font-bold text-sm w-full'>{cardTitle}</h2>
        {actions}
      </div>
      {children && <div className='flex flex-col gap-2 py-4 px-4'>{children}</div>}
    </div>
  )
})

Card.displayName = 'Card'

export default Card
