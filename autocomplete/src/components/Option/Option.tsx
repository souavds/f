import React from 'react'

import Card from 'components/Card'

import './Option.css'

export type OptionType = {
  value: string
  label: string
}

export type OptionProps = {
  children: React.ReactNode
  value?: OptionType
  onClick?: (value: OptionType) => void
}

function Option(props: OptionProps) {
  const { children, value, onClick } = props

  const disabled = !value || !onClick

  const handleSelect = () => {
    if (disabled) {
      return
    }

    onClick?.(value)
  }

  return (
    <Card
      aria-disabled={disabled}
      role="option"
      className={`option ${disabled ? 'disabled' : ''}`}
      onClick={handleSelect}
    >
      {children}
    </Card>
  )
}

export default Option
