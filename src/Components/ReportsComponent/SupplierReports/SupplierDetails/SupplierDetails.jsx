import React from 'react'
import ReportsHeadSearchComp from '../../ReportsHeadSearchComp'
import DropDownComp from '../../../../Common/DropDown/DropDown'
import Paragraph from '../../../../Common/Paragraph/Paragraph'
import ReportsTable from '../../ReportsTable'
import BelowTableButtonIndex from '../../../../Common/BelowTableButton/BelowTableButtonIndex'
import { SupplierReportsTableArr } from '../../SupplierReportsTableArr'

const SupplierDetails = () => {
  return (
    <div>
        <div style={{backgroundColor:"white",padding:"10px",margin:"10px 0px"}}>
        <div>
            <ReportsHeadSearchComp/>
        </div>
        <div>
            <DropDownComp DropDownValuesArr={["Choose Supplier Name","Supplier Name","Supplier Name","Supplier Name","Supplier Name","Supplier Name","Supplier Name","Supplier Name",]}/>
        </div>
        <div style={{border:"1px solid #487AE2",display:"flex",justifyContent:"center",alignItems:"center",height:"55px",marginTop:"10px"}}>
          <Paragraph value={"Supplier Name"} style={{color:"#487AE2"}}/>
        </div>
        <div style={{minWidth:"10px"}}>
          <ReportsTable SupplierReportsTableArr={SupplierReportsTableArr} />
        </div>
        </div>
        <div>
          <BelowTableButtonIndex/>
        </div>
    </div>
  )
}

export default SupplierDetails