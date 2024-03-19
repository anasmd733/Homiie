import React, { useEffect, useState } from 'react'
import ExpenseTableHead from '../../../../Common/ExpenseTable/ExpenseTableHead'
import TableWithAdd from '../../../../Common/TableWithAdd/TableWithAdd'
import { LedgerAccountArray } from './LadgerAccountArray'
import ReportsHeadSearchComp from '../../../ReportsComponent/ReportsHeadSearchComp'
import axios from 'axios'
import { EndPoint } from '../../../../EndPoints/EndPoint'

const LedgerAccountComp = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [success, setSuccess] = useState(false)
  const [tableData, setTableData] = useState([])
  useEffect(()=>{
    const ledgerOpenFun = async ()=>{
      let response = (await axios.get(`${EndPoint}/ledgerSupplier`)).data
      setTableData(response)
    } 
    ledgerOpenFun()
  },[])
  return (
    <div style={{ backgroundColor: "white", padding: "0px 20px" }}>
      <>
        <div style={{ padding: "20px 0px 0px 0px" }}>
          <ReportsHeadSearchComp addIcon={true} />
        </div>
        <div>
          <TableWithAdd TableWithAddArr={tableData} />
        </div>
      </>
    </div>
  )
}

export default LedgerAccountComp