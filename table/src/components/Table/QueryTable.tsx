import React from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'

import { GenericResponse, QueryParams } from 'types/Http'
import usePagination from 'hooks/usePagination'
import useDebounce from 'hooks/useDebounce'
import { Input } from 'components/TextField/styles'
import Button from 'components/Button'
import Icon from 'components/Icon'

import Table, { TableColumn } from './Table'
import { Container, PaginationWrapper } from './styles'

export type QueryTableProps<T> = {
  columns: TableColumn[]
  cacheKey: string
  fetcher: (params: QueryParams) => Promise<GenericResponse<T>>
}

function QueryTable<T>(props: QueryTableProps<T>) {
  const { columns, cacheKey, fetcher } = props

  const queryClient = useQueryClient()

  const [search, setSearch] = React.useState('')

  const debouncedSearch = useDebounce(search, 500)

  const { page, pages, hasNext, hasPrev, handleNextPage, handlePrevPage, calcPages } = usePagination()

  const { data } = useQuery([cacheKey, page, debouncedSearch], () => fetcher({ page, search: debouncedSearch }), {
    keepPreviousData: true
  })

  React.useEffect(() => {
    if (data) calcPages(data.count, data.results.length)
  }, [data?.count])

  React.useEffect(() => {
    const prefetchNextPage = async () => {
      await queryClient.prefetchQuery([cacheKey, page + 1, debouncedSearch], () =>
        fetcher({ page: page + 1, search: debouncedSearch })
      )
    }

    if (hasNext) {
      prefetchNextPage()
    }
  }, [hasNext, cacheKey, page, debouncedSearch])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <Container>
      <Input onChange={handleSearch} placeholder='Search character' />
      <Table columns={columns} data={data?.results} />
      <PaginationWrapper>
        {page} / {pages}
        <Button disabled={!hasPrev} onClick={handlePrevPage}>
          <Icon name='arrow-left' />
        </Button>
        <Button disabled={!hasNext} onClick={handleNextPage}>
          <Icon name='arrow-right' />
        </Button>
      </PaginationWrapper>
    </Container>
  )
}

export default QueryTable
