import React from 'react'
import TableWithCheckBox from './TableWithCheckBox'
import { TableWithCheckBoxArr } from './TableWithCheckBoxArr'
import ReportsHeadSearchComp from '../../../Components/ReportsComponent/ReportsHeadSearchComp'
import BelowTableButtonIndex from '../../BelowTableButton/BelowTableButtonIndex'

const TableWithCheckBoxTempSceen = () => {
  return (
    <div>
        <div style={{padding:"10px 0px 20px 0px",color:"#333A44",fontSize:"16px",fontWeight:"bold"}}>{"Transaction"} <b>{">"}</b> {"Sales Details"} </div>
        <div style={{backgroundColor:"white",padding:'10px',marginBottom:"10px"}}>
            <div>
                <ReportsHeadSearchComp addIcon={true}/>
            </div>
            <TableWithCheckBox TableWithAddArr={TableWithCheckBoxArr}/>
        </div>
        <div>
            <BelowTableButtonIndex/>
        </div>
    </div>
  )
}

export default TableWithCheckBoxTempSceen