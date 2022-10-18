import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPlanet } from 'services/PlanetService'

export type PlanetProps = {
  id: number
}

function Planet(props: PlanetProps) {
  const { id } = props

  const { isLoading, isError, error, data, isFetching, isPreviousData } = useQuery(
    ['planets', id],
    () => getPlanet(id),
    { keepPreviousData: true }
  )

  return <span>{data?.name}</span>
}

export default Planet
