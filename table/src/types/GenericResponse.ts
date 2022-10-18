export type GenericResponse<T> = {
  count: number
  next: string
  previous: string | null
  results: T[]
}
