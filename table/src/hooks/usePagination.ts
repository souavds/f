import React from 'react'

export default function usePagination() {
  const [page, setPage] = React.useState(1)
  const [pages, setPages] = React.useState(1)

  const handleNextPage = () => {
    if (!hasNext) return

    setPage(value => value + 1)
  }
  const handlePrevPage = () => {
    if (!hasPrev) return

    setPage(value => Math.max(value - 1, 1))
  }
  const calcPages = (total: number, limit: number) => {
    const pages = total / limit

    isNaN(pages) ? setPages(1) : setPages(Math.ceil(pages))
  }

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
