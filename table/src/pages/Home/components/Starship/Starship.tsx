import React from 'react'
import { useQuery } from '@tanstack/react-query'

import { getStarship } from 'services/StarshipService'
import Chip from 'components/Chip'

export type StarshipProps = {
  id: number
}

function Starship(props: StarshipProps) {
  const { id } = props

  const { data } = useQuery(['starships', id], () => getStarship(id), {
    keepPreviousData: true
  })

  return <Chip>{data?.name}</Chip>
}

export default Starship
