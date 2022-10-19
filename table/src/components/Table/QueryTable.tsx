import React from 'react'

import { useQuery } from '@tanstack/react-query'

import { GenericResponse, QueryParams } from 'types/Http'
import usePagination from 'hooks/usePagination'
import useDebounce from 'hooks/useDebounce'
import { Input } from 'components/TextField/styles'

import Table, { TableColumn } from './Table'

export type QueryTableProps<T> = {
  columns: TableColumn[]
  cacheKey: string
  fetcher: (params: QueryParams) => Promise<GenericResponse<T>>
}

function QueryTable<T>(props: QueryTableProps<T>) {
  const { columns, cacheKey, fetcher } = props

  const [search, setSearch] = React.useState('')

  const debouncedSearch = useDebounce(search, 500)

  const { page, pages, hasNext, hasPrev, handleNextPage, handlePrevPage, calcPages, reset } = usePagination()

  const { isLoading, isError, error, data, isFetching, isPreviousData } = useQuery(
    [cacheKey, page, debouncedSearch],
    () => fetcher({ page, search: debouncedSearch }),
    { keepPreviousData: true }
  )

  React.useEffect(() => {
    if (data) calcPages(data.count, data.results.length)
  }, [data?.count])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)

  return (
    <div>
      <Input onChange={handleSearch} placeholder='Search character' />
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
