import { styled, keyframes } from '@stitches/react'

const loading = keyframes({
  '0%': {
    backgroundColor: 'hsl(200, 20%, 80%)'
  },
  '100%': {
    backgroundColor: 'hsl(200, 20%, 95%)'
  }
})

export const Skeleton = styled('div', {
  animation: `${loading} 1s ease-in-out infinite alternate`,
  minHeight: '1.5rem',
  height: '100%',
  borderRadius: '0.8rem'
})
