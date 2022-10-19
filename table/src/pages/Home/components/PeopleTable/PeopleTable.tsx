import React from 'react'

import { QueryTable, TableColumn } from 'components/Table'
import { getPeople } from 'services/PeopleService'
import extractNumber from 'utils/extractNumber'

import Planet from '../Planet'
import Film from '../Film'
import Starship from '../Starship'
import Gender, { GenderType } from '../Gender'
import { Container } from './styles'

const columns: TableColumn[] = [
  {
    id: 'name',
    label: 'Name',
    render: (value: string) => value
  },
  {
    id: 'height',
    label: 'Height',
    render: (value: string) => {
      if (value !== 'unknown') {
        return `${Number(value) / 100} m`
      }
      return value
    }
  },
  {
    id: 'mass',
    label: 'Weight',
    render: (value: string) => {
      if (value !== 'unknown') {
        return `${value} kg`
      }
      return value
    }
  },
  {
    id: 'hair_color',
    label: 'Hair Color',
    render: (value: string) => value
  },
  {
    id: 'skin_color',
    label: 'Skin Color',
    render: (value: string) => value
  },
  {
    id: 'eye_color',
    label: 'Eye Color',
    render: (value: string) => value
  },
  {
    id: 'birth_year',
    label: 'Birth Year',
    render: (value: string) => value
  },
  {
    id: 'gender',
    label: 'Gender',
    render: (value: string) => <Gender type={value as GenderType} />
  },
  {
    id: 'homeworld',
    label: 'Planet',
    render: (value: string) => {
      const id = extractNumber(value)

      return <Planet id={id} />
    }
  },
  {
    id: 'films',
    label: 'Films',
    render: (value: string[]) => (
      <Container>
        {value.map(film => {
          const id = extractNumber(film)

          return <Film key={id} id={id} />
        })}
      </Container>
    )
  },
  {
    id: 'starships',
    label: 'Starships',
    render: (value: string[]) => (
      <Container>
        {value.map(starship => {
          const id = extractNumber(starship)

          return <Starship key={id} id={id} />
        })}
      </Container>
    )
  }
]

function PeopleTable() {
  return <QueryTable columns={columns} cacheKey='people' fetcher={getPeople} />
}

export default PeopleTable
