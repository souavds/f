import React from 'react'
import { render, screen } from '@testing-library/react'
import HighlightText from './HighlightText'

describe('HighlightText', () => {
  it('should highlight correct part of text', () => {
    render(<HighlightText text="Hello world" highlight="world" />)

    expect(screen.getByTestId('highlight')).toHaveTextContent('world')
  })
})
