import { render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Modal from './Modal'
import { useModal } from './useModal'

const intersectionObserverMock = function () {
  return {
    observe: jest.fn(),
    disconnect: jest.fn()
  }
}

//@ts-expect-error
window.IntersectionObserver = intersectionObserverMock

const SetupComponent = ({ open, isOpen, close }: { open?: () => void; isOpen: boolean; close: () => void }) => (
  <div>
    <button onClick={open}>Open</button>
    <Modal title='Title' actions={<button>Click me</button>} isOpen={isOpen} onClose={close}>
      <span>Content</span>
    </Modal>
  </div>
)

describe('Modal', () => {
  it('should render', () => {
    render(<SetupComponent isOpen={true} close={() => {}} />)

    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('should not render when closed', () => {
    render(<SetupComponent isOpen={false} close={() => {}} />)

    expect(screen.queryByText('Title')).not.toBeInTheDocument()
    expect(screen.queryByText('Content')).not.toBeInTheDocument()
    expect(screen.queryByText('Click me')).not.toBeInTheDocument()
  })

  it('should call onClose when clicking on the overlay', () => {
    const { result } = renderHook(() => useModal())

    render(<SetupComponent isOpen={result.current.isOpen} close={result.current.close} />)

    userEvent.click(document.body)

    expect(result.current.isOpen).toBe(false)
  })

  it('should open when clicking on the open button', async () => {
    const { result } = renderHook(() => useModal())

    const { rerender } = render(
      <SetupComponent open={result.current.open} isOpen={result.current.isOpen} close={result.current.close} />
    )

    userEvent.click(screen.getByText('Open'))

    rerender(<SetupComponent open={result.current.open} isOpen={result.current.isOpen} close={result.current.close} />)

    expect(result.current.isOpen).toBe(true)
    expect(await screen.findByText('Title')).toBeInTheDocument()
  })
})
