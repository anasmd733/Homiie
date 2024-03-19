import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReportsHeadSearchComp from '../../../ReportsComponent/ReportsHeadSearchComp'
import TableWithAdd from '../../../../Common/TableWithAdd/TableWithAdd'
import { EndPoint } from '../../../../EndPoints/EndPoint'

const ProductRegisterComp = () => {
  const [tableData, setTableData] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [success, setSuccess] = useState(false)
  const [headings, setHeadings] = useState()
  useEffect(()=>{
    const ledgerOpenFun = async()=>{
      try{
        let response = (await axios.get(`${EndPoint}/productRegister`)).data
        console.log(response);
        setTableData(response)
        setSuccess(true)
        console.log(response);
      } catch(err){
        console.error(err);
        setSuccess(false)
      }
      setIsLoaded(true)
    }
    ledgerOpenFun()

  },[])
  
  return (
    <div style={{ backgroundColor: "white", padding: "0px 20px" }}>
      {
        (isLoaded && success) ?
        <>
        <div style={{ padding: "20px 0px 0px 0px" }}>
          <ReportsHeadSearchComp addIcon={true} />
        </div>
        <div>
          <TableWithAdd TableWithAddArr={tableData} />
        </div>
      </> : !isLoaded ? <h1>Loading</h1> : <h1>Some Error Occured</h1>
      }
      
    </div>
  );
}

export default ProductRegisterComp