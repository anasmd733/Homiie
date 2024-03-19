import React from 'react'
import Paragraph from '../Paragraph/Paragraph'
import { ImCross } from "react-icons/im";
import "./Filter.css"
const FilteredDateButton = ({value,onclick}) => {
  return (
    <div className='FilteredDateButton-main-division'>

      <div className='FilteredDateButton-sub-division-one'>
      <Paragraph value={value} className='FilteredDateButton-Paragraph'/>
      </div>

      <div className='FilteredDateButton-sub-division-two' onClick={onclick}>
      <ImCross  fontSize={"10px"}/>
      </div>
    </div>
  )
}

export default FilteredDateButton
