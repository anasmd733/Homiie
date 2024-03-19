import React from 'react'
import GreenHoverButton from '../../Common/GreenHoverButton/GreenHoverButton'
import { useNavigate } from 'react-router-dom'
import { Path } from '../../Routes/Path';

const ReportsComponent = () => {
    const Navigate = useNavigate();
    const GreenHoverButtonStyle = {
        // flex : "1"
        width:"100%"
    } 
  return (
    <div style={{display:"flex",flexDirection:"column",height:"85vh",alignItems:"center",justifyContent:"center"}}>
        <div style={{display:"flex",flexDirection:"column",rowGap:"20px",width:"50vw"}}>
            <GreenHoverButton value={"Product Reports"} style={GreenHoverButtonStyle} onClick={()=>Navigate(Path.productReports)}/>
            <GreenHoverButton value={"Customer Reports"} style={GreenHoverButtonStyle} onClick={()=>Navigate(Path.customerReports)}/>
            <GreenHoverButton value={"Supplier Reports"} style={GreenHoverButtonStyle} onClick={()=>Navigate(Path.supplierReports)}/>
            <GreenHoverButton value={"Box Balance Reports"} style={GreenHoverButtonStyle} onClick={()=>Navigate(Path.boxBalanceReports)}/>
        </div>
    </div>
  )
}

export default ReportsComponent