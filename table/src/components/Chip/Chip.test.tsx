import React from 'react'
import { render, screen } from '@testing-library/react'

import Chip from './Chip'

describe('Chip', () => {
  it('should be in the document', () => {
    render(<Chip>children</Chip>)

    expect(screen.getByText(/children/i)).toBeInTheDocument()
  })
})
