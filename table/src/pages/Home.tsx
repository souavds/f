import React from 'react'
import { useQuery } from '@tanstack/react-query'

import Table from 'components/Table'
import { getPeople } from 'services/PeopleService'

function Home() {
  const [page, setPage] = React.useState(1)

  const { isLoading, isError, error, data, isFetching, isPreviousData } = useQuery(
    ['people', page],
    () => getPeople(page),
    { keepPreviousData: true }
  )

  console.log(data)

  return (
    <div>
      <h1>Home</h1>
      <Table />
    </div>
  )
}

export default Home
