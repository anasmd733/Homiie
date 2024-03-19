import React from 'react'
import FormTextBox from '../../FormCard/FormTextBox'
// import { TotalCountsBelowArr } from './TotalCountsArray'
import '../style.css'

const TotalCountsBelowTable = ({ TotalCountsBelowArr, onChange, userInputs, isBoxBalance }) => {
  return (
    <div style={{width:"40vw"}}>
        {
          TotalCountsBelowArr && TotalCountsBelowArr.length > 0 ?
            TotalCountsBelowArr.map((val,i)=>val.title == "Box Balance" ? isBoxBalance && <FormTextBox required={true} inpValue={userInputs[val.name]} name={val.name} onChange={onChange} key={i} Value={val.title} type={val.type} /> : <FormTextBox required={true} inpValue={userInputs[val.name]} name={val.name} onChange={onChange} key={i} Value={val.title} type={val.type} /> )
            : ""
        }
    </div>
  )
}

export default TotalCountsBelowTable