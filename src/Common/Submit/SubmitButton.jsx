import React from 'react'
import "./SubmitButton.css"
import { useNavigate } from 'react-router-dom'

const SubmitButton = ({className , style , path , pathState , submitPath, type ,onClick}) => {

  const Navigate = useNavigate()
  const handleClick = () => {
    if (onClick) {
      onClick()
    } 
    else if (pathState === "true") {
      Navigate(path);
    } 
    else if (submitPath != null) {
      Navigate(submitPath);
    }
  };
  
  return (
    <div>
     <button 
      type={"submit"}
      style={style} 
      className={`SubmitButton-default ${className}`}
      onClick={handleClick}>{"Submit"}</button>
    </div>
  )
}

SubmitButton.defaultProps = {
  className : ''
}

export default SubmitButton