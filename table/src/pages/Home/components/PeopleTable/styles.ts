import { styled } from 'theme/theme'

export const ChipLoader = styled('div', {
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '$radii$md',
  minWidth: 'fit-content',
  height: 'fit-content',
  whiteSpace: 'nowrap'
})

export const Chips = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '$space$md',
  width: '100%',
  overflowX: 'auto',
  height: '100%'
})
