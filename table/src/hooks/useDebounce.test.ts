import { renderHook } from '@testing-library/react'

import useDebounce from './useDebounce'

describe('useDebounce', () => {
  it('should debounce value', async () => {
    const { result, rerender } = renderHook(() => useDebounce('Hello', 500))
    expect(result.current).toBe('Hello')
    rerender()
    expect(result.current).toBe('Hello')
  })
})
