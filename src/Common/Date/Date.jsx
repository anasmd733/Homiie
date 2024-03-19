import React from 'react'
import Textbox from "../Textbox/Textbox.jsx"
import "./Date.css"
const Date = () => {
  return (
   <div>
    <Textbox type={"date"} className='Date-box' placeholder='enter'/>
   </div>
  )
}

export default Date