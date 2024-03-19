import React from 'react'
import "./SubmitButton.css"
import { useNavigate } from 'react-router-dom'

const Button = ({className , style , value , onClick }) => {
 
  
  return (
    <button className={`SubmitButton-default ${className}`} onClick={onClick} style={style}>{value}</button>
  )
}

Button.defaultProps = {
    className : ''
  }
  

export default Button
