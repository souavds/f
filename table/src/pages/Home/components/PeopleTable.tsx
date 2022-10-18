import React from 'react'
import { useQuery } from '@tanstack/react-query'

import Table, { TableColumn } from 'components/Table'
import { getPeople } from 'services/PeopleService'

const columns: TableColumn[] = [
  {
    id: 'name',
    label: 'Name',
    render: (value: string) => value
  },
  {
    id: 'height',
    label: 'Height',
    render: (value: string) => value
  },
  {
    id: 'mass',
    label: 'Weight',
    render: (value: string) => value
  },
  {
    id: 'hair_color',
    label: 'Hair Color',
    render: (value: string) => value
  },
  {
    id: 'skin_color',
    label: 'Skin Color',
    render: (value: string) => value
  },
  {
    id: 'eye_color',
    label: 'Eye Color',
    render: (value: string) => value
  },
  {
    id: 'birth_year',
    label: 'Birth Year',
    render: (value: string) => value
  },
  {
    id: 'gender',
    label: 'Gender',
    render: (value: string) => value
  },
  {
    id: 'homeworld',
    label: 'Homeworld',
    render: (value: string) => value
  },
  {
    id: 'films',
    label: 'Films',
    render: (value: string[]) => value.join(', ')
  },
  {
    id: 'starships',
    label: 'Starships',
    render: (value: string[]) => value.join(', ')
  }
]

function PeopleTable() {
  const [page, setPage] = React.useState(1)

  const { isLoading, isError, error, data, isFetching, isPreviousData } = useQuery(
    ['people', page],
    () => getPeople(page),
    { keepPreviousData: true }
  )

  const handlePreviousPage = () => setPage(old => Math.max(old - 1, 1))
  const handleNextPage = () => setPage(page + 1)

  return (
    <div>
      <Table columns={columns} data={data?.results} />
      <button disabled={!data?.previous} onClick={handlePreviousPage}>
        Previous
      </button>
      <button disabled={!data?.next} onClick={handleNextPage}>
        Next
      </button>
    </div>
  )
}

export default PeopleTable
