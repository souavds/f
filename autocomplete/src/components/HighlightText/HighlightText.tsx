import React from 'react'

import './HighlightText.css'

export type HighlightTextProps = {
  text: string
  highlight: string
}

function HighlightText(props: HighlightTextProps) {
  const { text, highlight } = props

  const regex = new RegExp(`(${highlight})`, 'gi')

  return (
    <span>
      {text.split(regex).map((part, index) => {
        return regex.test(part) ? (
          <mark data-testid="highlight" className="highlight" key={index}>
            {part}
          </mark>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        )
      })}
    </span>
  )
}

export default HighlightText
