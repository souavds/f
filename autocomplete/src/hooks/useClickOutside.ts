import React from 'react'

function useClickOutside<T extends HTMLElement>(ref: React.RefObject<T>, callback: (event: MouseEvent) => void) {
  React.useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event)
      }
    }

    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [ref, callback])
}

export default useClickOutside
