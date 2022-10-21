import React from 'react'
import { useQuery } from '@tanstack/react-query'

import { getStarship } from 'services/StarshipService'
import Chip from 'components/Chip'

import { Container } from './styles'

export type StarshipProps = {
  id: number
}

function Starship(props: StarshipProps) {
  const { id } = props

  const { data } = useQuery(['starships', id], () => getStarship(id), {
    keepPreviousData: true
  })

  return (
    <Chip>
      <Container>
        <span>Name: {data?.name}</span>
        <span>Model: {data?.model}</span>
        <span>Manufacturer: {data?.manufacturer}</span>
      </Container>
    </Chip>
  )
}

export default Starship
