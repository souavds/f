import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getFilm } from 'services/FilmService'

export type FilmProps = {
  id: number
}

function Film(props: FilmProps) {
  const { id } = props

  const { isLoading, isError, error, data, isFetching, isPreviousData } = useQuery(['films', id], () => getFilm(id), {
    keepPreviousData: true
  })

  return <span>{data?.title}</span>
}

export default Film
