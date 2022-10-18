import fetcher from 'configs/fetcher'
import { GenericResponse } from 'types/GenericResponse'

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

export const getPeople = async (page = 0) => {
  const people = await fetcher<PeopleResponse>(`people/?page=${page}`)
  return people
}
