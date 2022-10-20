import React from 'react'

import { Skeleton } from './styles'

export type LoaderProps = React.ComponentPropsWithoutRef<'div'>

function Loader(props: LoaderProps) {
  return <Skeleton {...props}/>
}

export default Loader