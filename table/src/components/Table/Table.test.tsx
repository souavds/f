import React from 'react'
import { render, screen } from '@testing-library/react'

import Table from './Table'

const columns = [
  {
    id: 'name',
    label: 'Name',
    render: (value: string) => value
  },
  {
    id: 'age',
    label: 'Age',
    render: (value: number) => value
  },
  {
    id: 'email',
    label: 'Email',
    render: (value: string) => value
  }
]

const data = [
  {
    name: 'John',
    age: 30,
    email: 'john@email.com'
  },
  {
    name: 'Jane',
    age: 25,
    email: 'jane@email.com'
  },
  {
    name: 'Bob',
    age: 40,
    email: 'bob@email.com'
  }
]

describe('Table', () => {
  it('should render properly', () => {
    render(<Table data={data} columns={columns} />)

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(4)

    columns.forEach(column => {
      expect(screen.getByText(column.label)).toBeInTheDocument()
    })

    data.forEach(row => {
      expect(screen.getByText(row.name)).toBeInTheDocument()
      expect(screen.getByText(row.age)).toBeInTheDocument()
      expect(screen.getByText(row.email)).toBeInTheDocument()
    })
  })

  it('should render properly with empty data', () => {
    render(<Table data={[]} columns={columns} />)

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(1)

    columns.forEach(column => {
      expect(screen.getByText(column.label)).toBeInTheDocument()
    })
  })

  it('should render properly with empty data and columns', () => {
    render(<Table data={[]} columns={[]} />)

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(1)
  })
})
