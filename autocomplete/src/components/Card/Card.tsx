import React from 'react'

import './Card.css'

export type CardProps = {
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<'div'>

function Card(props: CardProps) {
  const { children, className, ...rest } = props
  return (
    <div className={`card ${className ?? ''}`} {...rest}>
      {children}
    </div>
  )
}

export default Card
