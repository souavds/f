import { globalCss } from './theme'

const globalStyles = globalCss({
  '*,*::before, *::after': {
    margin: 0,
    padding: 0,
    boxSizing: 'inherit'
  },
  html: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    scrollBehavior: 'smooth'
  },
  body: {
    fontFamily: 'Roboto, sans-serif',
    background: '$colors$white'
  }
})

export default globalStyles
