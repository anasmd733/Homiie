import React from 'react'
import Paragraph from '../Paragraph/Paragraph'
import "./FormCardStyle.css"

const FormHeading = ({value}) => {
  return (
    <div>
        <div  className='FormCard-para-division'> 
        <Paragraph 
         className='FormCard-Paragraph' 
         value={value}/>
        </div>
    </div>
  )
}

export default FormHeading
