import React, { useEffect, useState } from "react";
import TransactionTablesWithEntry from "../Index/TransactionTablesWithEntry";
import ExpenseTableHead from "../../../Common/ExpenseTable/ExpenseTableHead";
import axios from "axios";
import { EndPoint } from "../../../EndPoints/EndPoint";

const BoxDetailComponent = () => {
  const [customerNames, setCustomerNames] = useState([])
  const [boxDetails, setBoxDetails] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const tableHeads = [
    { heading: 'S.No', dataType: 'number' },
    { heading: 'Date', dataType: 'date' },
    { heading: 'Customer Name', dataType: 'text' },
    { heading: 'Remark', dataType: 'text' },
    { heading: 'Stock In', dataType: 'number' },  
    { heading: 'Stock Out', dataType: 'number' },
    { heading: 'Balance', dataType: 'number' },
  ]
const [tableInputs, setTableInputs] = useState([])
const [tableDatas, setTableDatas] = useState(
[
  {
    SNo: "",
    Date: "",
    CustomerName: "",
    Remark: "",
    BoxIn: "",
    BoxOut: "",
    Balance: "",
  }
]
)

const dateFun = ()=>{
  const date = new Date();
  const dateInp = `${date.getFullYear()}-${
    date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  }-${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}`
  return dateInp;
}

useEffect(()=>{
  let date = dateFun();
  const openFun = async ()=>{
    try{
      const customer = await axios.get(`${EndPoint}/ledgerCustomer`)
      setCustomerNames(customer.data.map(val=>val.customerName))
      // console.log(customer.data.map(val=>val.customerName));
      const boxDetail = await axios.get(`${EndPoint}/boxDetails`)
      // console.log(boxDetail.data);
      setBoxDetails(boxDetail.data)
      setError(false)
    } catch(err){
      setError(true)
    }
  }
  setLoaded(true)
  openFun()
},[])

const onSubmitHandler = async (e)=>{
  e.preventDefault();
  // try{
  //   const res = await axios.post("http://localhost:3000/boxDetails",tableInputs);
  //   console.log(res);
  // }
  // catch(err){
  //   console.error(err);
  // }
  console.log(tableInputs);
}
  return (
    <div>
      {
        loaded && !error ?
        <TransactionTablesWithEntry
          customerNames = {customerNames}
          boxDetails={boxDetails}
          date={dateFun()}
          tableHeadsAndTypes={tableHeads}
          isExportToExcel={true}
          tableDatas={tableDatas}
          startBread={"Transaction"}
          endBread={"Box"}
          isSaveButton={true}
          TableInputs={tableInputs}
          setTableInputs={setTableInputs}
          onSubmitHandler = {onSubmitHandler}
        /> : !loaded ? <h1>Loading!!!</h1> : <h1>Error</h1>
      }
    </div>
  );
};

export default BoxDetailComponent;