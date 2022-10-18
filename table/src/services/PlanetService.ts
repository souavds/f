import fetcher from 'configs/fetcher'

export type Planet = {
  name: string
  rotation_period: string
  orbital_period: string
  diameter: string
  climate: string
  gravity: string
  terrain: string
  surface_water: string
  population: string
  residents: string[]
  films: string[]
  created: string
  edited: string
  url: string
}

export type PlanetResponse = Planet

export const getPlanet = async (id: number) => {
  const value = await fetcher<PlanetResponse>(`planets/${id}`)
  return value
}
