import React from 'react'
import './TextField.css'

export type TextFieldProps = React.ComponentPropsWithoutRef<'input'>

function TextField(props: TextFieldProps) {
  const { className, ...rest } = props

  return <input className={`text-field ${className ?? ''}`} {...rest} />
}

export default TextField
