import React from 'react'

import * as Styles from './styles'

export type TableColumn = {
  id: string
  label: string
  render: (value: any) => React.ReactNode | string
  loader?: React.ReactNode
}

export type TableProps<T> = {
  columns?: TableColumn[]
  data?: T[]
}

function Table<T>(props: TableProps<T>) {
  const { columns = [], data = [] } = props

  return (
    <Styles.Table>
      <Styles.TableHead>
        <Styles.TableRow>
          {columns.map(column => (
            <Styles.TableHeader key={column.id}>{column.label}</Styles.TableHeader>
          ))}
        </Styles.TableRow>
      </Styles.TableHead>
      <Styles.TableBody>
        {data.map((row, index) => (
          <Styles.TableRow key={index}>
            {columns.map(column => (
              <Styles.TableCell key={`${index}-${column.id}`}>
                <React.Suspense fallback={column.loader}>{column.render(row[column.id as keyof T])}</React.Suspense>
              </Styles.TableCell>
            ))}
          </Styles.TableRow>
        ))}
      </Styles.TableBody>
    </Styles.Table>
  )
}

export default Table
