import { render, screen } from '@testing-library/react'

import Icon from './Icon'

describe('Icon', () => {
  it('should render properly', async () => {
    render(<Icon type='plus' />)

    const icon = await screen.findByTitle('plus')
    expect(icon).toBeInTheDocument()
  })
})
