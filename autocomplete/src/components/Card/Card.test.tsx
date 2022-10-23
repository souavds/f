import React from 'react'
import { render, screen } from '@testing-library/react'

import Card from './Card'

describe('Card', () => {
  it('should be in the document', () => {
    render(<Card>children</Card>)

    expect(screen.getByText(/children/i)).toBeInTheDocument()
  })
})
