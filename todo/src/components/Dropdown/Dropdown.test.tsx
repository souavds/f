import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Menu } from '@headlessui/react'

import Dropdown from './Dropdown'

describe('Dropdown', () => {
  it('should render', () => {
    render(
      <Dropdown action={<Menu.Button>Click me</Menu.Button>}>
        <Menu.Item>
          <span>Content</span>
        </Menu.Item>
      </Dropdown>
    )

    const actionBtn = screen.getByRole('button', { name: 'Click me' })

    expect(actionBtn).toBeInTheDocument()

    userEvent.click(actionBtn)

    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})
