import React from 'react'

import { GenericIconProps } from '../Icon'

function Ellipsis(props: GenericIconProps) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' {...props}>
      <title>{props.id}</title>
      <path d='M120 256c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm160 0c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm104 56c-30.9 0-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56s-25.1 56-56 56z' />
    </svg>
  )
}

export default Ellipsis
