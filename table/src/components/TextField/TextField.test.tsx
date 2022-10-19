import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import TextField from './TextField'

describe('TextField', () => {
  it('should render different types of field', () => {
    const { rerender } = render(<TextField type='email' />)

    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')

    rerender(<TextField type='text' />)

    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')
  })

  it('should type the value', () => {
    render(<TextField type='text' />)

    const input = screen.getByRole('textbox')

    userEvent.type(input, 'Natasha')

    expect(input).toHaveValue('Natasha')
  })
})
