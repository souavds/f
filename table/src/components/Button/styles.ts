import { styled } from 'theme/theme'

export const Btn = styled('button', {
  cursor: 'pointer',
  padding: '$sizes$md $sizes$lg',
  border: 'none',
  borderRadius: '$radii$md',
  background: '$colors$gray500',

  variants: {
    disabled: {
      true: {
        cursor: 'not-allowed',
        background: '$colors$gray200'
      }
    }
  }
})
