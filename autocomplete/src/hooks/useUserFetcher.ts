import React from 'react'

import { useFetcher } from 'api'
import { User } from 'domain/User'

type UseUserFetcherProps = {
  query: string
  options?: {
    orderBy?: 'asc' | 'desc'
    sortBy?: keyof User
  }
}

function useUserFetcher(props: UseUserFetcherProps) {
  const { query, options = {} } = props
  const { orderBy = 'asc', sortBy = 'name' } = options

  const fetcher = useFetcher()

  const [isLoading, setIsLoading] = React.useState(false)
  const [data, setData] = React.useState<User[]>([])

  React.useEffect(() => {
    async function search() {
      try {
        setIsLoading(true)
        const users = await fetcher<User[]>(`/users?name=${query}&order=${orderBy}&sortBy=${sortBy}`)
        setData(users)
      } catch (e) {
        setData([])
      } finally {
        setIsLoading(false)
      }
    }

    search()
  }, [query, orderBy, sortBy, fetcher])

  return {
    data,
    isLoading
  }
}

export default useUserFetcher
