import { styled, keyframes } from 'theme/theme'

const loading = keyframes({
  '0%': {
    backgroundColor: '$colors$gray200'
  },
  '100%': {
    backgroundColor: '$colors$gray500'
  }
})

export const Skeleton = styled('div', {
  animation: `${loading} 1s ease-in-out infinite alternate`,
  minHeight: '1.5rem',
  height: '100%',
  borderRadius: 'inherit'
})
