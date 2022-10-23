import { renderHook, act } from '@testing-library/react'
import * as uuid from 'uuid'

import { useBoardStore } from './board'

jest.mock('uuid')

const initialState = {
  columns: {
    backlog: {
      id: 'backlog',
      title: 'Backlog',
      tasks: {}
    },
    todo: {
      id: 'todo',
      title: 'Todo',
      tasks: {}
    },
    'on-going': {
      id: 'on-going',
      title: 'On going',
      tasks: {}
    },
    'team-review': {
      id: 'team-review',
      title: 'Team review',
      tasks: {}
    }
  }
}

describe('useBoardStore', () => {
  it('should return the initial state', () => {
    const { result } = renderHook(() => useBoardStore())
    expect(result.current).toEqual({
      ...initialState,
      getColumnById: expect.any(Function),
      countTasksByColumn: expect.any(Function),
      addTask: expect.any(Function),
      updateTask: expect.any(Function),
      removeTask: expect.any(Function),
      moveTask: expect.any(Function)
    })
  })

  it('should return the column by id', () => {
    const { result } = renderHook(() => useBoardStore())
    expect(result.current.getColumnById('backlog')).toEqual(initialState.columns.backlog)
  })

  it('should add a task to a column', () => {
    jest.spyOn(uuid, 'v4').mockReturnValue('random-id')

    const { result } = renderHook(() => useBoardStore())

    act(() => {
      result.current.addTask('backlog', 'Task 1')
    })

    expect(result.current.columns.backlog.tasks).toEqual({
      'random-id': {
        id: 'random-id',
        content: 'Task 1'
      }
    })
  })

  it('should return the number of tasks by column', () => {
    const { result } = renderHook(() => useBoardStore())

    expect(result.current.countTasksByColumn('backlog')).toEqual(0)

    act(() => {
      result.current.addTask('backlog', 'Task 1')
    })

    expect(result.current.countTasksByColumn('backlog')).toEqual(1)
  })

  it('should update a task', () => {
    const { result } = renderHook(() => useBoardStore())

    jest.spyOn(uuid, 'v4').mockReturnValue('random-id')

    act(() => {
      result.current.addTask('backlog', 'Task 1')
    })

    act(() => {
      result.current.updateTask('backlog', 'random-id', 'Task 1 updated')
    })

    expect(result.current.columns.backlog.tasks['random-id'].content).toEqual('Task 1 updated')
  })

  it('should remove a task', () => {
    const { result } = renderHook(() => useBoardStore())

    jest.spyOn(uuid, 'v4').mockReturnValue('random-id')

    act(() => {
      result.current.addTask('backlog', 'Task 1')
    })

    expect(result.current.countTasksByColumn('backlog')).toEqual(1)

    act(() => {
      result.current.removeTask('backlog', 'random-id')
    })

    expect(result.current.countTasksByColumn('backlog')).toEqual(0)
  })

  it('should move a task to another column', () => {
    const { result } = renderHook(() => useBoardStore())

    jest.spyOn(uuid, 'v4').mockReturnValue('random-id')

    act(() => {
      result.current.addTask('backlog', 'Task 1')
    })

    expect(result.current.countTasksByColumn('backlog')).toEqual(1)
    expect(result.current.countTasksByColumn('todo')).toEqual(0)

    act(() => {
      result.current.moveTask('backlog', 'todo', 'random-id')
    })

    expect(result.current.countTasksByColumn('backlog')).toEqual(0)
    expect(result.current.countTasksByColumn('todo')).toEqual(1)
  })
})
