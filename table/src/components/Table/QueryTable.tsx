import React from 'react'

import { useQuery } from '@tanstack/react-query'

import { GenericResponse } from 'types/GenericResponse'
import usePagination from 'hooks/usePagination'

import Table, { TableColumn } from './Table'

export type QueryTableProps<T> = {
  columns: TableColumn[]
  cacheKey: string
  fetcher: (page?: number) => Promise<GenericResponse<T>>
}

function QueryTable<T>(props: QueryTableProps<T>) {
  const { columns, cacheKey, fetcher } = props

  const { page, pages, hasNext, hasPrev, handleNextPage, handlePrevPage, calcPages } = usePagination()

  const { isLoading, isError, error, data, isFetching, isPreviousData } = useQuery(
    [cacheKey, page],
    () => fetcher(page),
    { keepPreviousData: true }
  )

  React.useEffect(() => {
    if (data) calcPages(data.count, data.results.length)
  }, [data?.count])

  return (
    <div>
      <Table columns={columns} data={data?.results} />
      <button disabled={!hasPrev} onClick={handlePrevPage}>
        Previous
      </button>
      <button disabled={!hasNext} onClick={handleNextPage}>
        Next
      </button>
      {page} / {pages}
    </div>
  )
}

export default QueryTable
