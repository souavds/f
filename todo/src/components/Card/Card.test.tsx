import { render, screen } from '@testing-library/react'

import Card from './Card'

describe('Card', () => {
  it('should render properly', () => {
    render(<Card cardTitle='Card title' actions={<span>actions</span>} />)

    const title = screen.getByText('Card title')
    const actions = screen.getByText('actions')

    expect(title).toBeInTheDocument()
    expect(actions).toBeInTheDocument()
  })

  it('should render children properly', () => {
    render(
      <Card cardTitle='Card title' actions={<span>actions</span>}>
        <span>children</span>
      </Card>
    )

    const children = screen.getByText('children')

    expect(children).toBeInTheDocument()
  })
})
