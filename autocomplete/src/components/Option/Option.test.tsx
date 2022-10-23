import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Option from './Option'

const optionMock = { value: '1', label: 'option 1' }
const onClickMock = jest.fn()

const setup = () =>
  render(
    <Option value={optionMock} onClick={onClickMock}>
      {optionMock.label}
    </Option>
  )

describe('Option', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the option text', () => {
    setup()
    const children = screen.getByText(/option 1/i)
    expect(children).toBeInTheDocument()
  })

  it('should pass option data when clicked', () => {
    setup()
    const element = screen.getByRole('option', { name: optionMock.label })
    userEvent.click(element)
    expect(onClickMock).toHaveBeenCalledWith(optionMock)
  })

  it('should not call onClick when disabled', () => {
    render(<Option>{optionMock.label}</Option>)
    const element = screen.getByRole('option', { name: optionMock.label })
    userEvent.click(element)
    expect(onClickMock).toBeCalledTimes(0)
  })
})
