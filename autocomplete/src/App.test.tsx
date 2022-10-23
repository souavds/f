import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import App from './App'

const server = setupServer(
  rest.get('*/users', (req, res, ctx) => {
    if (req.url.searchParams.get('name') === 'John') {
      return res(ctx.status(404), ctx.json('Not found'))
    }

    return res(
      ctx.json([
        { name: 'Brenda Kilback', id: 1 },
        { name: 'Brandy Franey', id: 2 },
        { name: 'Dominick Bruen', id: 3 }
      ])
    )
  })
)

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('App', () => {
  it('should render properly', async () => {
    render(<App />)
    const input = screen.getByRole('textbox')

    userEvent.type(input, 'Brenda')

    const option = await screen.findByText('Brenda')
    expect(option).toBeInTheDocument()
  })

  it('should select an option', async () => {
    render(<App />)
    const input = screen.getByRole('textbox')

    userEvent.type(input, 'Brenda')

    const option = await screen.findByText('Brenda')
    userEvent.click(option)

    expect(input).toHaveValue('Brenda Kilback')
    expect(screen.getByText(/{"value":1,"label":"Brenda Kilback"}/i)).toBeInTheDocument()
  })

  it('should render empty results', async () => {
    render(<App />)
    const input = screen.getByRole('textbox')

    userEvent.type(input, 'John')

    const noResults = await screen.findByText('No data found.')
    expect(noResults).toBeInTheDocument()
  })

  it('should render empty state', async () => {
    render(<App />)
    const input = screen.getByRole('textbox')

    userEvent.click(input)

    const emptyStateText = await screen.findByText('Search to find options.')

    expect(emptyStateText).toBeInTheDocument()
  })
})
