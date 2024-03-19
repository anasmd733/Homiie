import React from 'react'
import Paragraph from '../Paragraph/Paragraph'
import "./ProductDeteilsCard.css"
import InputBox from '../InputBox/InputBox.jsx'

const Deteils = ({Stock,onChange,defaultValue,unit,disabled,onClick}) => {


  return (
    <div className='Deteils-main-div' onClick={onClick}>
      <Paragraph 
      className='Deteils-stock'
      value={Stock}/>

    <InputBox 
     type="text" 
     className='Deteils-kg-textbox' 
     onChange={onChange}
     defaultValue={defaultValue}
     disabled={disabled}
     />

     <Paragraph 
     className='Deteils-unit'
     value={unit}/>
    </div>
  )
}

Deteils.defaultProps = {
  Stock : 0,
  defaultValue : 0,
  unit : 'kg',
  disabled : false
}

export default Deteils
