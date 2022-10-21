import { createStitches } from '@stitches/react'

const { styled, css, keyframes, globalCss } = createStitches({
  theme: {
    colors: {
      white: '#ffffff',
      gray200: '#f5f5f5',
      gray500: '#e4e4e4'
    },
    sizes: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '1rem',
      xl: '2rem',
      xxl: '3rem',
      xxxl: '5rem',
      xxxxl: '10rem'
    },
    space: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '1rem',
      xl: '5rem',
      xxl: '10rem'
    },
    radii: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '1rem'
    }
  }
})

export { styled, css, keyframes, globalCss }
