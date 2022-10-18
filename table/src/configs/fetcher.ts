const API_URL = process.env.REACT_APP_API_URL

export type Endpoint = RequestInfo
export type Config = RequestInit

async function fetcher<T>(endpoint: Endpoint, config: Config = {}): Promise<T> {
  return fetch(`${API_URL}${endpoint}`, config).then(async response => {
    const data = (await response.json()) as Promise<T>
    if (response.ok) return data
    return Promise.reject(data)
  })
}

export default fetcher
