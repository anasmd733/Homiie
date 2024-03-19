import React, { useState } from 'react'
// import {DropDownValuesArr} from './dropDownValuesArr'
import { MenuItem, Select } from '@mui/material'
import { Colors } from '../../Colors/Colors'

const DropDownComp = ({DropDownValuesArr}) => {
  const [selectedOption, setSelectedOption] = useState(DropDownValuesArr[0])
  return (
    <Select style={{width:'100%',border:`1px solid ${Colors.cement}`}} name="" id="" value={selectedOption} onChange={(e)=>setSelectedOption(e.target.value)}>
      {
        DropDownValuesArr && DropDownValuesArr.length > 0 ?  DropDownValuesArr.map((opt,i)=> <MenuItem key={i} value={opt}>{opt}</MenuItem> ) : <MenuItem>{` `}</MenuItem>
      }
    </Select>
  )
}

DropDownComp.defaultProps = {
  DropDownValuesArr : []
}

export default DropDownComp