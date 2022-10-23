/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act, renderHook } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as uuid from 'uuid'

import { useTaskFormStore } from 'stores/task-form'
import { useBoardStore } from 'stores/board'
import { initialState as boardInitialState } from 'stores/board.test'

import Column from './Column'

jest.mock('uuid')

const intersectionObserverMock = function () {
  return {
    observe: jest.fn(),
    disconnect: jest.fn()
  }
}

//@ts-expect-error
window.IntersectionObserver = intersectionObserverMock

describe('Column', () => {
  it('should render', async () => {
    await act(async () => {
      render(<Column id='backlog' />)
    })

    const regex = new RegExp(boardInitialState.columns.backlog.title, 'i')

    const heading = screen.getByRole('heading', { name: regex })

    expect(heading).toBeInTheDocument()
  })

  it('should render with tasks', async () => {
    const { result: boardStore } = renderHook(() => useBoardStore())

    jest.spyOn(uuid, 'v4').mockReturnValue('test-id')

    await act(async () => {
      render(<Column id={boardInitialState.columns.backlog.id} />)
    })

    await act(async () => {
      boardStore.current.addTask(boardInitialState.columns.backlog.id, 'Task Name')
    })

    const task = screen.getByText('Task Name')

    expect(task).toBeInTheDocument()
  })

  it('should create task', async () => {
    const { result: taskFormStore } = renderHook(() => useTaskFormStore())
    const { result: boardStore } = renderHook(() => useBoardStore())

    jest.spyOn(uuid, 'v4').mockReturnValue('test-id')

    await act(async () => {
      render(<Column id={boardInitialState.columns.backlog.id} />)
    })

    const addTaskBtn = screen.getByRole('button', { name: /add task/i })

    userEvent.click(addTaskBtn)

    expect(taskFormStore.current.isOpen).toBe(true)
    expect(taskFormStore.current.columnId).toBe(boardInitialState.columns.backlog.id)

    await act(async () => {
      boardStore.current.addTask(boardInitialState.columns.backlog.id, 'Task Name')
    })

    const task = screen.getByText('Task Name')
    expect(task).toBeInTheDocument()
  })
})
