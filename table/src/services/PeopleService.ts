import fetcher from 'configs/fetcher'
import { GenericResponse, QueryParams } from 'types/Http'

export type Person = {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: string[]
  species: string[]
  vehicles: string[]
  starships: string[]
  created: string
  edited: string
  url: string
}

export type PeopleResponse = GenericResponse<Person>

export const getPeople = async ({ page = 0, search = '' }: QueryParams) => {
  const value = await fetcher<PeopleResponse>(`people/?page=${page}&search=${search}`)
  return value
}
