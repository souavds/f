import React from 'react'

import fetcher, { Endpoint, Config } from '../api'

type UseFetcherProps = {
  prefix: string
}

function useFetcher(props: UseFetcherProps = { prefix: '/api/v1' }) {
  const { prefix } = props
  return React.useCallback(
    <T>(endpoint: Endpoint, config: Config = {}) => fetcher<T>(`${prefix}${endpoint}`, config),
    [prefix]
  )
}

export default useFetcher
