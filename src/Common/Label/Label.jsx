import React from 'react'
import "./Label.css"
const Label = ({htmlFor,className,value}) => {
  return (
      <label htmlFor={htmlFor} className={`Label-default ${className}`}>{value}</label>
  )
}

Label.defaultProps = {
  htmlFor : '',
  className : '',
  value : 'Null'
}

export default Label