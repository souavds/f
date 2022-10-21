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
  verticalAlign: 'middle'
})

export const TableHeader = styled('th', {
  display: 'table-cell',
  textAlign: 'left'
})

export const TableCell = styled('td', {
  display: 'table-cell',
  textAlign: 'left',
  width: '$sizes$xxl',
  maxWidth: '$sizes$xxxxl',
  height: '$sizes$xxxxl',
  overflowX: 'auto',
  padding: '$space$sm'
})

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'end',
  width: '100%',
  gap: '$space$lg'
})

export const TableContainer = styled('div', {
  width: '100%',
  overflowX: 'auto'
})

export const PaginationWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '$space$lg'
})
