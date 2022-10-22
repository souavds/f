import React from 'react'
import { render, screen } from '@testing-library/react'

import Button from './Button'

describe('Button', () => {
  it('should be in the document', () => {
    render(<Button>children</Button>)

    expect(screen.getByText(/children/i)).toBeInTheDocument()
  })

  it('should click', () => {
    const onClick = jest.fn()

    render(<Button onClick={onClick}>children</Button>)

    screen.getByText(/children/i).click()

    expect(onClick).toHaveBeenCalled()
  })
})
