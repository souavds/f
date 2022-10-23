import { renderHook, act } from '@testing-library/react'

import { useModal } from './useModal'

describe('useModal', () => {
  it('should open and close', () => {
    const { result } = renderHook(() => useModal())

    expect(result.current.isOpen).toBe(false)

    act(() => {
      result.current.open()
    })

    expect(result.current.isOpen).toBe(true)

    act(() => {
      result.current.close()
    })

    expect(result.current.isOpen).toBe(false)
  })
})
