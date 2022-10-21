import { styled } from 'theme/theme'

export const Container = styled('div', {
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '$sizes$sm $sizes$md',
  background: '$colors$gray200',
  borderRadius: '$radii$md',
  minWidth: 'fit-content',
  height: 'fit-content',
  whiteSpace: 'nowrap'
})
