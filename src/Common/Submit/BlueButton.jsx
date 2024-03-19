import React from 'react'
import "./SubmitButton.css"

const BlueButton = ({value , className, style,icon }) => {
  return (
  <button style={style} className={`BlueButton-button ${className}`}>{value}  {icon}</button>
  )
}
BlueButton.defaultProps = {
  className : '',
  value:""
}

export default BlueButton
