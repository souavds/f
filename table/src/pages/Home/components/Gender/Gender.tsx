import React from 'react'

import { Container } from 'components/Chip/styles'

const Emojis = {
  male: '🧔🏽‍♂️',
  female: '👩🏼‍🦱',
  hermaphrodite: '🧔🏻‍♀️',
  'n/a': '🤖',
  none: '🤖',
  unknown: '🤖'
}

export type GenderType = 'male' | 'female' | 'hermaphrodite' | 'n/a' | 'none' | 'unknown'

export type GenderProps = {
  type: GenderType
}

function Gender(props: GenderProps) {
  const { type } = props

  return <Container>{Emojis[type]}</Container>
}

export default Gender
