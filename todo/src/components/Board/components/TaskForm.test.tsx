/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act, renderHook } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as uuid from 'uuid'

import { useTaskFormStore } from 'stores/task-form'
import { useBoardStore } from 'stores/board'
import { initialState as boardInitialState } from 'stores/board.test'

import TaskForm from './TaskForm'

jest.mock('uuid')

const intersectionObserverMock = function () {
  return {
    observe: jest.fn(),
    disconnect: jest.fn()
  }
}

//@ts-expect-error
window.IntersectionObserver = intersectionObserverMock

describe('TaskForm', () => {
  it('should render', async () => {
    const { result: taskFormStore } = renderHook(() => useTaskFormStore())

    render(<TaskForm />)

    act(() => {
      taskFormStore.current.setColumnId(boardInitialState.columns.backlog.id)
      taskFormStore.current.toggle()
    })

    expect(screen.getByText('Add task to')).toBeInTheDocument()
    expect(screen.getByText(boardInitialState.columns.backlog.title)).toBeInTheDocument()
  })

  it('should render with task', async () => {
    const { result: taskFormStore } = renderHook(() => useTaskFormStore())

    render(<TaskForm />)

    act(() => {
      taskFormStore.current.setColumnId(boardInitialState.columns.backlog.id)
      taskFormStore.current.setTask({ id: 'test-id', content: 'Task Name' })
      taskFormStore.current.toggle()
    })

    expect(screen.getByText('Task Name')).toBeInTheDocument()
  })

  it('should create task', async () => {
    const { result: taskFormStore } = renderHook(() => useTaskFormStore())
    const { result: boardStore } = renderHook(() => useBoardStore())

    jest.spyOn(uuid, 'v4').mockReturnValue('test-id')

    render(<TaskForm />)

    act(() => {
      taskFormStore.current.setColumnId(boardInitialState.columns.backlog.id)
      taskFormStore.current.toggle()
    })

    const input = screen.getByRole('textbox')

    userEvent.type(input, 'Task Name')

    const addBtn = screen.getByRole('button', { name: 'Add' })

    expect(boardStore.current.countTasksByColumn(boardInitialState.columns.backlog.id)).toEqual(0)

    act(() => {
      userEvent.click(addBtn)
    })

    expect(boardStore.current.countTasksByColumn(boardInitialState.columns.backlog.id)).toEqual(1)
    expect(boardStore.current.columns.backlog.tasks).toEqual({
      'test-id': {
        id: 'test-id',
        content: 'Task Name'
      }
    })
  })

  it('should update task', async () => {
    const { result: taskFormStore } = renderHook(() => useTaskFormStore())
    const { result: boardStore } = renderHook(() => useBoardStore())

    jest.spyOn(uuid, 'v4').mockReturnValue('test-id')

    render(<TaskForm />)

    act(() => {
      boardStore.current.addTask(boardInitialState.columns.backlog.id, 'Task Name')
      taskFormStore.current.setColumnId(boardInitialState.columns.backlog.id)
      taskFormStore.current.setTask({ id: 'test-id', content: 'Task Name' })
      taskFormStore.current.toggle()
    })

    const input = screen.getByRole('textbox')

    userEvent.clear(input)
    userEvent.type(input, 'Updated Task Name')

    const updateBtn = screen.getByRole('button', { name: 'Update' })

    expect(boardStore.current.columns.backlog.tasks).toEqual({
      'test-id': {
        id: 'test-id',
        content: 'Task Name'
      }
    })

    act(() => {
      userEvent.click(updateBtn)
    })

    expect(boardStore.current.columns.backlog.tasks).toEqual({
      'test-id': {
        id: 'test-id',
        content: 'Updated Task Name'
      }
    })
  })
})
