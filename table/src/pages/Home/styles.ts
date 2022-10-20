import { styled } from 'theme/theme'

export const Container = styled('div', {
  padding: '5rem 10rem'
})

export const Title = styled('h1', {
  width: 'fit-content',
  padding: '$sizes$xl $sizes$xxl',
  borderRadius: '$radii$lg',
  background: '$colors$gray200',
  marginBottom: '$space$lg'
})
