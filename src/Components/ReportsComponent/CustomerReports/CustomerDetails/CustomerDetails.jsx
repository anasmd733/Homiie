import React, { useEffect, useState } from 'react'
import ReportsHeadSearchComp from '../../ReportsHeadSearchComp'
import DropDownComp from '../../../../Common/DropDown/DropDown'
import Paragraph from '../../../../Common/Paragraph/Paragraph'
import ReportsTable from '../../ReportsTable'
import BelowTableButtonIndex from '../../../../Common/BelowTableButton/BelowTableButtonIndex'
import { CustomerDetailsArray } from './CustomerDetailsArray'

const CustomerDetails = ({unFormatedData}) => {
  const [formattedOutput, setFormattedOutput] = useState([]);
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(()=>{
    const openFun = async () => {
      const newFormattedOutput = [];
      unFormatedData.forEach((entry) => {
        const { id, SalesId, Date, BoxBalance, productDetails, BillAmount, CashRecieved } = entry;
        productDetails.forEach((productDetail) => {
          const { "Product Name": productName } = productDetail;
          newFormattedOutput.push({
            id,
            "Sales Id": SalesId,
            "Date" : Date,
            "Box Balance": BoxBalance,
            "Product Name": productName,
            "Total Amount": BillAmount,
            "Paid Amount": CashRecieved
          });
        });
      });
      setFormattedOutput(newFormattedOutput);
      setLoaded(true);
    };
    
    openFun()
},[])

  return (
    <div>
      {
        loaded && !error ? 
          <div>
            <div style={{backgroundColor:"white",padding:"10px",margin:"10px 0px"}}>
            <div>
                <ReportsHeadSearchComp/>
            </div>
            <div>
                <DropDownComp DropDownValuesArr={["Choose Customer Name","Customer Name","Customer Name","Customer Name","Customer Name","Customer Name","Customer Name","Customer Name",]}/>
            </div>
            <div style={{border:"1px solid #487AE2",display:"flex",justifyContent:"center",alignItems:"center",height:"55px",marginTop:"10px"}}>
              <Paragraph value={"Customer Name"} style={{color:"#487AE2"}}/>
            </div>
            <div style={{minWidth:"10px"}}>
              <ReportsTable SupplierReportsTableArr={formattedOutput} />
            </div>
            </div>
            <div>
              <BelowTableButtonIndex/>
            </div>
          </div> : !loaded ? <h1>Loading</h1> : <h1>Error</h1>
      }
    </div>
  )
}

export default CustomerDetails