import React from 'react'

import { Container } from './styles'

export type ChipProps = {
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<'div'>

function Chip(props: ChipProps) {
  const { children, ...rest } = props

  return <Container {...rest}>{children}</Container>
}

export default Chip
