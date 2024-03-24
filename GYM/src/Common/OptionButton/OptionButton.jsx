import React from 'react'
import "./OptionButton.css"
const OptionButton = ({className,icon,onClick,iscricrle, style}) => {
  return (

      <button  
      type = "button"
      style={style}
      onClick={onClick} 
      className={iscricrle==true ?"OptionButton-circle" :"OptionButton-default"}>{icon}
      </button>
   
  )
}

OptionButton.defaultProps = {
  className :'',
  iscricrle : false
}

export default OptionButton