import fetcher from 'configs/fetcher'

export type Film = {
  title: string
  episode_id: number
  opening_crawl: string
  producer: string
  release_date: string
  characters: string[]
  planets: string[]
  starships: string[]
  vehicles: string[]
  species: string[]
  created: string
  edited: string
  url: string
}

export type FilmResponse = Film

export const getFilm = async (id: number) => {
  const value = await fetcher<FilmResponse>(`films/${id}`)
  return value
}
