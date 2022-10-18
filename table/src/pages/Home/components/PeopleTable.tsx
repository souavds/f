import React from 'react'

import { QueryTable, TableColumn } from 'components/Table'
import Planet from 'components/Planet'
import Film from 'components/Film'
import Starship from 'components/Starship'
import { getPeople } from 'services/PeopleService'
import extractId from 'utils/extractId'

const columns: TableColumn[] = [
  {
    id: 'name',
    label: 'Name',
    render: (value: string) => value
  },
  {
    id: 'height',
    label: 'Height',
    render: (value: string) => value
  },
  {
    id: 'mass',
    label: 'Weight',
    render: (value: string) => value
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
    render: (value: string) => value
  },
  {
    id: 'homeworld',
    label: 'Planet',
    render: (value: string) => {
      const id = extractId(value)

      return <Planet id={id} />
    }
  },
  {
    id: 'films',
    label: 'Films',
    render: (value: string[]) => {
      return value.map(film => {
        const id = extractId(film)

        return <Film key={id} id={id} />
      })
    }
  },
  {
    id: 'starships',
    label: 'Starships',
    render: (value: string[]) => {
      return value.map(starship => {
        const id = extractId(starship)

        return <Starship key={id} id={id} />
      })
    }
  }
]

function PeopleTable() {
  return <QueryTable columns={columns} cacheKey='people' fetcher={getPeople} />
}

export default PeopleTable
