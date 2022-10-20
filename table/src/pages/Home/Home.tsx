import React from 'react'

import PeopleTable from './components/PeopleTable'

import { Container, Title } from './styles'

function Home() {
  return (
    <Container>
      <Title>Star Wars Encyclopedia 🚀</Title>
      <PeopleTable />
    </Container>
  )
}

export default Home
