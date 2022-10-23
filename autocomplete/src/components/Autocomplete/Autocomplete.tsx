import React from 'react'

import TextField from 'components/TextField'
import Option, { OptionType } from 'components/Option'
import Card from 'components/Card'
import HighlightText from 'components/HighlightText'
import SearchIcon from 'components/SearchIcon'
import useClickOutside from 'hooks/useClickOutside'

import './Autocomplete.css'

type AutocompleteProps = {
  value?: OptionType
  onChange?: (value: string) => void
  onSelect?: (value?: OptionType) => void
  loading: boolean
  options: OptionType[]
  placeholder: string
  loadingText?: string
  emptyResultText?: string
  emptyOptionsText?: string
}

function Autocomplete(props: AutocompleteProps) {
  const {
    value,
    onChange,
    onSelect,
    loading,
    options,
    placeholder,
    loadingText = 'Loading...',
    emptyResultText = 'No data found.',
    emptyOptionsText = 'Search to find options.'
  } = props

  const [textFieldValue, setTextFieldValue] = React.useState(value?.label ?? '')
  const [showDropdown, setShowDropdown] = React.useState(false)

  const ref = React.useRef<HTMLDivElement>(null)
  useClickOutside(ref, _ => setShowDropdown(false))

  const handleFocus = () => setShowDropdown(true)
  const handleBlur = () => {
    if (value && textFieldValue.length) {
      onChange?.(value.label)
      setTextFieldValue(value.label)
      return
    }

    onSelect?.(undefined)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value
    onChange?.(text)
    setTextFieldValue(text)
  }

  const handleSelect = (option: OptionType) => {
    setTextFieldValue(option.label)
    setShowDropdown(false)
    onChange?.(option.label)
    onSelect?.(option)
  }

  const renderOptions = () => {
    if (loading) {
      return <Option>{loadingText}</Option>
    }

    if (options.length && textFieldValue.length) {
      return options.map(option => (
        <Option key={option.value} value={option} onClick={handleSelect}>
          <HighlightText text={option.label} highlight={textFieldValue} />
        </Option>
      ))
    }

    return <Option>{textFieldValue.length ? emptyResultText : emptyOptionsText}</Option>
  }

  return (
    <div className="autocomplete" ref={ref}>
      <div className="field-group">
        <TextField
          className="field"
          autoComplete="off"
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          value={textFieldValue}
        />
        <SearchIcon className="search-icon" />
      </div>

      {showDropdown && (
        <Card className="options-dropdown" role="listbox">
          {renderOptions()}
        </Card>
      )}
    </div>
  )
}

export default Autocomplete
