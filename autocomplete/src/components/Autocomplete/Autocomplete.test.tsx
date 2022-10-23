import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Autocomplete from './Autocomplete'

describe('Autocomplete', () => {
  it('should render properly', () => {
    render(<Autocomplete options={[]} loading={false} placeholder="Search" />)

    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()

    userEvent.click(input)

    const dropdown = screen.getByRole('listbox')
    expect(dropdown).toBeInTheDocument()
  })

  it('should render options when type', () => {
    const options = [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
      { label: 'Option 3', value: 'option-3' }
    ]

    const onChange = jest.fn()

    render(<Autocomplete options={options} onChange={onChange} loading={false} placeholder="Search" />)

    const input = screen.getByRole('textbox')
    userEvent.type(input, 'Option')

    expect(onChange).toBeCalledTimes(6)

    const dropdown = screen.getByRole('listbox')
    expect(dropdown).toBeInTheDocument()

    const optionsElements = screen.getAllByRole('option')
    expect(optionsElements).toHaveLength(3)
  })

  it('should select option', () => {
    const options = [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
      { label: 'Option 3', value: 'option-3' }
    ]

    const onSelect = jest.fn()

    render(<Autocomplete options={options} onSelect={onSelect} loading={false} placeholder="Search" />)

    const input = screen.getByRole('textbox')
    userEvent.type(input, 'Option')

    const dropdown = screen.getByRole('listbox')
    expect(dropdown).toBeInTheDocument()

    const optionsElements = screen.getAllByRole('option')
    expect(optionsElements).toHaveLength(3)

    userEvent.click(optionsElements[0])

    expect(onSelect).toHaveBeenCalled()
    expect(onSelect).toBeCalledWith(options[0])
  })

  it('should close dropdown when user click outside', () => {
    const options = [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
      { label: 'Option 3', value: 'option-3' }
    ]

    render(<Autocomplete options={options} loading={false} placeholder="Search" />)

    const input = screen.getByRole('textbox')
    userEvent.click(input)

    const dropdown = screen.getByRole('listbox')
    expect(dropdown).toBeInTheDocument()

    userEvent.click(document.body)

    expect(dropdown).not.toBeInTheDocument()
  })

  it('should keep option selected when user click outside', () => {
    const options = [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
      { label: 'Option 3', value: 'option-3' }
    ]

    const onSelect = jest.fn()

    const { rerender } = render(
      <Autocomplete options={options} onSelect={onSelect} loading={false} placeholder="Search" />
    )

    const input = screen.getByRole('textbox')
    userEvent.type(input, 'Option')

    const dropdown = screen.getByRole('listbox')
    expect(dropdown).toBeInTheDocument()

    const optionsElements = screen.getAllByRole('option')
    expect(optionsElements).toHaveLength(3)

    userEvent.click(optionsElements[0])

    expect(onSelect).toHaveBeenCalled()
    expect(onSelect).toBeCalledWith(options[0])

    rerender(
      <Autocomplete value={options[0]} options={options} onSelect={onSelect} loading={false} placeholder="Search" />
    )

    userEvent.type(input, '{backspace}{backspace}{backspace}')

    userEvent.click(document.body)

    expect(input).toHaveValue('Option 1')
  })

  it('should render loading text when loading', () => {
    render(<Autocomplete options={[]} loading={true} placeholder="Search" />)

    const input = screen.getByRole('textbox')
    userEvent.click(input)

    const dropdown = screen.getByRole('listbox')
    expect(dropdown).toBeInTheDocument()

    const optionsElements = screen.getAllByRole('option')
    expect(optionsElements).toHaveLength(1)
    expect(optionsElements[0]).toHaveTextContent('Loading...')
  })

  it('should render empty result text when no options', () => {
    render(<Autocomplete options={[]} loading={false} placeholder="Search" />)

    const input = screen.getByRole('textbox')
    userEvent.type(input, 'Option')

    const dropdown = screen.getByRole('listbox')
    expect(dropdown).toBeInTheDocument()

    const optionsElements = screen.getAllByRole('option')
    expect(optionsElements).toHaveLength(1)
    expect(optionsElements[0]).toHaveTextContent('No data found.')
  })

  it('should render empty options text when no options and no search', () => {
    render(<Autocomplete options={[]} loading={false} placeholder="Search" />)

    const input = screen.getByRole('textbox')
    userEvent.click(input)

    const dropdown = screen.getByRole('listbox')
    expect(dropdown).toBeInTheDocument()

    const optionsElements = screen.getAllByRole('option')
    expect(optionsElements).toHaveLength(1)
    expect(optionsElements[0]).toHaveTextContent('Search to find options.')
  })
})
