import React from 'react'
import { useQuery } from '@tanstack/react-query'

import { getFilm } from 'services/FilmService'
import Chip from 'components/Chip'

export type FilmProps = {
  id: number
}

function Film(props: FilmProps) {
  const { id } = props

  const { data } = useQuery(['films', id], () => getFilm(id), {
    keepPreviousData: true
  })

  return <Chip>{data?.title}</Chip>
}

export default Film
