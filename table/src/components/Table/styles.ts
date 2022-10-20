import { styled } from 'theme/theme'

export const Table = styled('table', {
  display: 'table',
  width: '100%',
  overflowX: 'auto',
  borderCollapse: 'collapse',
  borderSpacing: 0
})

export const TableHead = styled('thead', {
  display: 'table-header-group'
})

export const TableBody = styled('tbody', {
  display: 'table-row-group'
})

export const TableRow = styled('tr', {
  display: 'table-row',
  height: '$sizes$xxl'
})

export const TableHeader = styled('th', {
  maxWidth: '10rem'
})

export const TableCell = styled('td', {
  overflowX: 'auto'
})

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'end',
  width: '100%',
  gap: '$space$lg'
})

export const PaginationWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '$space$lg'
})
