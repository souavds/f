import { act, renderHook } from '@testing-library/react'

import usePagination from './usePagination'

describe('usePagination', () => {
  it('should paginate correctly', () => {
    const { result } = renderHook(() => usePagination())

    expect(result.current).toEqual({
      page: 1,
      pages: 1,
      hasNext: false,
      hasPrev: false,
      handleNextPage: expect.any(Function),
      handlePrevPage: expect.any(Function),
      calcPages: expect.any(Function),
      reset: expect.any(Function)
    })

    act(() => {
      result.current.calcPages(101, 10)
    })

    expect(result.current).toEqual({
      page: 1,
      pages: 11,
      hasNext: true,
      hasPrev: false,
      handleNextPage: expect.any(Function),
      handlePrevPage: expect.any(Function),
      calcPages: expect.any(Function),
      reset: expect.any(Function)
    })
  })

  it('should call next page', () => {
    const { result } = renderHook(() => usePagination())

    act(() => {
      result.current.calcPages(101, 10)
      result.current.handleNextPage()
    })

    expect(result.current).toEqual({
      page: 2,
      pages: 11,
      hasNext: true,
      hasPrev: true,
      handleNextPage: expect.any(Function),
      handlePrevPage: expect.any(Function),
      calcPages: expect.any(Function),
      reset: expect.any(Function)
    })
  })

  it('should call prev page', () => {
    const { result } = renderHook(() => usePagination())

    act(() => {
      result.current.calcPages(101, 10)
      result.current.handleNextPage()
      result.current.handleNextPage()
      result.current.handleNextPage()
      result.current.handlePrevPage()
    })

    expect(result.current).toEqual({
      page: 3,
      pages: 11,
      hasNext: true,
      hasPrev: true,
      handleNextPage: expect.any(Function),
      handlePrevPage: expect.any(Function),
      calcPages: expect.any(Function),
      reset: expect.any(Function)
    })
  })

  it('should do not call next page when there is no next page', () => {
    const { result } = renderHook(() => usePagination())

    act(() => {
      result.current.calcPages(101, 10)
      result.current.handleNextPage()
      result.current.handleNextPage()
      result.current.handleNextPage()
      result.current.handleNextPage()
      result.current.handleNextPage()
      result.current.handleNextPage()
      result.current.handleNextPage()
      result.current.handleNextPage()
      result.current.handleNextPage()
      result.current.handleNextPage()
    })

    expect(result.current).toEqual({
      page: 11,
      pages: 11,
      hasNext: false,
      hasPrev: true,
      handleNextPage: expect.any(Function),
      handlePrevPage: expect.any(Function),
      calcPages: expect.any(Function),
      reset: expect.any(Function)
    })
  })

  it('should reset', () => {
    const { result } = renderHook(() => usePagination())

    act(() => {
      result.current.calcPages(101, 10)
      result.current.handleNextPage()
      result.current.handleNextPage()
      result.current.handleNextPage()
      result.current.handlePrevPage()
      result.current.reset()
    })

    expect(result.current).toEqual({
      page: 1,
      pages: 1,
      hasNext: false,
      hasPrev: false,
      handleNextPage: expect.any(Function),
      handlePrevPage: expect.any(Function),
      calcPages: expect.any(Function),
      reset: expect.any(Function)
    })
  })
})
