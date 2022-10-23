import { render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Modal from './Modal'
import { useModal } from './useModal'

describe('Modal', () => {
  it('should render', () => {
    render(
      <Modal title='Title' actions={<button>Click me</button>} isOpen={true} onClose={() => {}}>
        <span>Content</span>
      </Modal>
    )

    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('should not render when closed', () => {
    render(
      <Modal title='Title' actions={<button>Click me</button>} isOpen={false} onClose={() => {}}>
        <span>Content</span>
      </Modal>
    )

    expect(screen.queryByText('Title')).not.toBeInTheDocument()
    expect(screen.queryByText('Content')).not.toBeInTheDocument()
    expect(screen.queryByText('Click me')).not.toBeInTheDocument()
  })

  it('should call onClose when clicking on the overlay', () => {
    const { result } = renderHook(() => useModal())

    render(
      <Modal
        title='Title'
        actions={<button>Click me</button>}
        isOpen={result.current.isOpen}
        onClose={result.current.close}
      >
        <span>Content</span>
      </Modal>
    )

    userEvent.click(document.body)

    expect(result.current.isOpen).toBe(false)
  })

  it.skip('should open when clicking on the open button', async () => {
    const { result } = renderHook(() => useModal())

    render(
      <div>
        <button onClick={result.current.open}>Open</button>
        <Modal
          title='Title'
          actions={<button>Click me</button>}
          isOpen={result.current.isOpen}
          onClose={result.current.close}
        >
          <span>Content</span>
        </Modal>
      </div>
    )

    userEvent.click(screen.getByText('Open'))

    expect(result.current.isOpen).toBe(true)
    expect(await screen.findByText('Title')).toBeInTheDocument()
  })
})
