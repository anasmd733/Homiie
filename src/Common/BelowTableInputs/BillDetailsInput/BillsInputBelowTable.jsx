import React from 'react'
// import { BillInputsArray } from './billInputsArray'
import FormTextBox from '../../FormCard/FormTextBox'
import '../style.css';

const BillDetailsInput = ({ BillInputsArray, onChange, userInputs }) => {
  return (
    <div>
        {
          BillInputsArray && BillInputsArray.length > 0 ?
          BillInputsArray.map((val,i)=><FormTextBox required={true} inpValue={userInputs[val.name]} name={val.name} onChange={onChange} key={i} Value={val.title} type={val.type}/>)
          : ""
        }
    </div>
  )
}
export default BillDetailsInput