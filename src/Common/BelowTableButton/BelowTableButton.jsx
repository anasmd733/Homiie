import React from 'react'
import "./BelowTableButton.css";
import { useNavigate } from 'react-router-dom';

const BelowTableButton = ({className,value,location}) => {
  const Navigate=useNavigate()
  return (
      <button onClick={()=>{Navigate(location)}} className={`BelowTableButton-default ${className}`}>{value}</button>
  )
}
BelowTableButton.defaultProps = { 
  className : '',
  value : '-'
}
export default BelowTableButton