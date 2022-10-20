import React from 'react'

import { Btn } from './styles'

export type ButtonProps = {
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<'button'>

function Button(props: ButtonProps) {
  const { children, ...rest } = props

  return <Btn {...rest}>{children}</Btn>
}

export default Button
