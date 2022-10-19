import React from 'react'

import { Input } from './styles'

export type TextFieldProps = React.ComponentPropsWithoutRef<'input'>

function TextField(props: TextFieldProps) {
  return <Input {...props} />
}

export default TextField
