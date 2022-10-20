import React from 'react'
import { useQuery } from '@tanstack/react-query'

import { getPlanet } from 'services/PlanetService'
import Chip from 'components/Chip'

export type PlanetProps = {
  id: number
}

function Planet(props: PlanetProps) {
  const { id } = props

  const { data } = useQuery(['planets', id], () => getPlanet(id), { keepPreviousData: true })

  return <Chip>{data?.name}</Chip>
}

export default Planet
