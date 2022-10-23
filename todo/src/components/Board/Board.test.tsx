/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react'

import { DndContext } from '@dnd-kit/core'

import { initialState as boardInitialState } from 'stores/board.test'

import Board from './Board'

describe('Board', () => {
  it('should render', async () => {
    await act(async () => {
      render(
        <DndContext>
          <Board />
        </DndContext>
      )
    })

    const regex = new RegExp(boardInitialState.columns.backlog.title, 'i')

    const heading = screen.getByRole('heading', { name: regex })

    expect(heading).toBeInTheDocument()
  })
})
