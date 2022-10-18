import fetcher from 'configs/fetcher'

export type Starship = {
  name: string
  model: string
  manufacturer: string
  cost_in_credits: string
  length: string
  max_atmosphering_speed: string
  crew: string
  passengers: string
  cargo_capacity: string
  consumables: string
  hyperdrive_rating: string
  MGLT: string
  starship_class: string
  pilots: string[]
  films: string[]
  created: string
  edited: string
  url: string
}

export type StarshipResponse = Starship

export const getStarship = async (id: number) => {
  const value = await fetcher<StarshipResponse>(`starships/${id}`)
  return value
}
