import React, { useEffect, useState } from "react";
import ExpenseTableHead from "../../../../Common/ExpenseTable/ExpenseTableHead";
import TableWithAdd from "../../../../Common/TableWithAdd/TableWithAdd";
import { MasterTableArray } from "../MasterDetailTable";
import ReportsHeadSearchComp from "../../../ReportsComponent/ReportsHeadSearchComp";
import axios from "axios";
import { SearchFuntion } from "../../../../Common/SearchBar/SearchFuction";
import { EndPoint } from "../../../../EndPoints/EndPoint";

const CustomerLedger = () => {
  
  const [tableData, setTableData] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [success, setSuccess] = useState(false)
  const [filtered, setFiltered] = useState([])
  const [headings, setHeadings] = useState()
  useEffect(()=>{
    const ledgerOpenFun = async()=>{
      try{
        let response = (await axios.get(`${EndPoint}/ledgerCustomer`)).data
        // console.log(response);
        setTableData(response)
        setFiltered(response)
        setSuccess(true)
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
          <ReportsHeadSearchComp onChange={(e)=>SearchFuntion(e,tableData, setFiltered)} addIcon={true} />
        </div>
        <div>
          <TableWithAdd TableWithAddArr={filtered} />
        </div>
      </> : !isLoaded ? <h1>Loading</h1> : <h1>Some Error Occured</h1>
      }
      
    </div>
  );
};

export default CustomerLedger;