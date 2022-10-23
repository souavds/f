import React from 'react'

import Autocomplete from 'components/Autocomplete'
import Card from 'components/Card'
import { OptionType } from 'components/Option'
import useUserFetcher from 'hooks/useUserFetcher'
import useDebounce from 'hooks/useDebounce'

import './App.css'

const SEARCH_DELAY = 200

function App() {
  const [query, setQuery] = React.useState('')

  const [value, setValue] = React.useState<OptionType | undefined>()

  const debouncedQuery = useDebounce(query, SEARCH_DELAY)

  const { data, isLoading } = useUserFetcher({ query: debouncedQuery })

  const handleChange = (value: string) => setQuery(value)
  const handleSelect = (value?: OptionType) => setValue(value)

  const options = React.useMemo(() => data.map(user => ({ value: user.id, label: user.name } as OptionType)), [data])

  return (
    <div className="container">
      <div className="content">
        <Autocomplete
          placeholder="Search names: e.g. Brenda"
          value={value}
          onChange={handleChange}
          onSelect={handleSelect}
          loading={isLoading}
          options={options}
        />
        {value && (
          <Card className="selected">
            <pre>
              <code>Selected: {JSON.stringify(value)}</code>
            </pre>
          </Card>
        )}
      </div>
    </div>
  )
}

export default App
