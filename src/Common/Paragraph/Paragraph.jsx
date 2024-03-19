import React from 'react'
import './style.css'

const Paragraph = ({value, id, className, style}) => {
  return (
    <p id={id} className={`paragraph ${className}`} style={style}>{value}</p>
  )
}

Paragraph.defaultProps = {
  value : '',
  id : '',
  className : '',
}

export default Paragraph;