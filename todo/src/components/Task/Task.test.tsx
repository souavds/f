/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react'
import { render, screen, act, renderHook } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as uuid from 'uuid'

import { useTaskFormStore } from 'stores/task-form'
import { useBoardStore } from 'stores/board'
import { initialState as boardInitialState } from 'stores/board.test'

import Task from './Task'

jest.mock('uuid')

describe('Task', () => {
  it('should render', async () => {
    const task = { id: '1', content: 'Task Name' }

    await act(async () => {
      render(<Task columnId={boardInitialState.columns.backlog.id} value={task} />)
    })

    expect(screen.getByText('Task Name')).toBeInTheDocument()
  })

  it('should open task form', async () => {
    const task = { id: '1', content: 'Task Name' }

    const { result: taskFormStore } = renderHook(() => useTaskFormStore())

    await act(async () => {
      render(<Task columnId={boardInitialState.columns.backlog.id} value={task} />)
    })

    userEvent.click(screen.getByText('Task Name'))

    expect(taskFormStore.current.isOpen).toBe(true)
    expect(taskFormStore.current.columnId).toBe(boardInitialState.columns.backlog.id)
    expect(taskFormStore.current.task).toEqual(task)
  })
})
