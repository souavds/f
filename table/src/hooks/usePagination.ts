import React from 'react'

export default function usePagination() {
  const [page, setPage] = React.useState(1)
  const [pages, setPages] = React.useState(1)

  const handleNextPage = () => setPage(value => value + 1)
  const handlePrevPage = () => setPage(value => Math.max(value - 1, 1))
  const calcPages = (total: number, limit: number) => setPages(Math.ceil(total / limit))

  const reset = () => {
    setPage(1)
    setPages(1)
  }

  const hasNext = page < pages
  const hasPrev = page > 1

  return {
    page,
    pages,
    hasNext,
    hasPrev,
    handleNextPage,
    handlePrevPage,
    calcPages,
    reset
  }
}
