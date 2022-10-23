import { renderHook, act } from '@testing-library/react'

import { useTaskFormStore } from './task-form'

const initialState = {
  isOpen: false,
  columnId: '',
  task: { id: '', content: '' }
}

describe('useTaskFormStore', () => {
  it('should return the initial state', () => {
    const { result } = renderHook(() => useTaskFormStore())

    expect(result.current).toEqual({
      ...initialState,
      setColumnId: expect.any(Function),
      setTask: expect.any(Function),
      toggle: expect.any(Function),
      reset: expect.any(Function)
    })
  })

  it('should set the column id', () => {
    const { result } = renderHook(() => useTaskFormStore())

    act(() => {
      result.current.setColumnId('backlog')
    })

    expect(result.current.columnId).toEqual('backlog')
  })

  it('should set the task', () => {
    const { result } = renderHook(() => useTaskFormStore())

    act(() => {
      result.current.setTask({ id: 'random-id', content: 'Task 1' })
    })

    expect(result.current.task).toEqual({ id: 'random-id', content: 'Task 1' })
  })

  it('should toggle the modal', () => {
    const { result } = renderHook(() => useTaskFormStore())

    act(() => {
      result.current.toggle()
    })

    expect(result.current.isOpen).toEqual(true)
  })

  it('should reset the state', () => {
    const { result } = renderHook(() => useTaskFormStore())

    act(() => {
      result.current.setColumnId('backlog')
      result.current.setTask({ id: 'random-id', content: 'Task 1' })
      result.current.toggle()
      result.current.reset()
    })

    expect(result.current).toEqual({
      ...initialState,
      setColumnId: expect.any(Function),
      setTask: expect.any(Function),
      toggle: expect.any(Function),
      reset: expect.any(Function)
    })
  })
})
