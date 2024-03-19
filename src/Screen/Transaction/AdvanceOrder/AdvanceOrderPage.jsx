import React, { useEffect, useState } from 'react'
import TransactionTablesWithEntry from '../../../Components/Transaction/Index/TransactionTablesWithEntry'
import { TransactioInputNotIcArr, TransactionTopArr } from './AdvanceOderarray'
import { TopTableIcons } from '../BillAndTableArray'
import { emptyArr } from './EmptyArr'
import axios from 'axios'
import { EndPoint } from '../../../EndPoints/EndPoint'

const AdvanceOrderPage = () => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [errorMsg, setErrMsg] = useState("")

  const [productAndId, setProductAndId] = useState([])
  const [customerAndId, setCustomerAndId] = useState([])
  const tableHeads = [
    { heading: 'S.No', dataType: 'number' },
    { heading: 'Product Name', dataType: 'text' },
    { heading: 'Product Quantity', dataType: 'number' },
  ]
  const [advanceDetails, setAdvanceDetails] = useState(
    {
      Date : "",
      Remarks : "",
      CustomerName : "",
      AdvanceAmount : "",
    }
  )
  const [tableInputs, setTableInputs] = useState([])
  
  const openFun = async ()=>{
      setLoaded(false)
      const currentDate = new Date();
      let nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + 1);
      if (nextDate.getMonth() !== currentDate.getMonth()) {
        nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
      }
      let dateVar = `${nextDate.getFullYear()}-${(nextDate.getMonth() + 1).toString().padStart(2, '0')}-${nextDate.getDate().toString().padStart(2, '0')}`
      setAdvanceDetails({...advanceDetails, Date: dateVar})
    try{
      const productRegister = await axios.get(`${EndPoint}/productRegister`);
      const customers = await axios.get(`${EndPoint}/ledgerCustomer`);
      // console.log(customers.data);
      const custAndId = [];
      customers.data.forEach((val)=>{
        let data = {
          "CustomerName" : val.customerName,
          "SalesId" : val.salesId,
          "NameInTamil" : val.nameInTamil
        }
        custAndId.push(data)
      })
      setCustomerAndId(custAndId);
      // console.log(custAndId);
      const prodAndId = [];
      // console.log(productRegister.data);
      productRegister.data.forEach((val)=>{
        let data = {
          "tamil" : val.productNameTamil,
          "productName" : val.productName,
          "productId" : val.productId,
          "productRate" : val.productRate
        }
      prodAndId.push(data);
    })
    setProductAndId(prodAndId)
    setError(false)
    setErrMsg("")
    } catch(err){
      setError(true)
      setErrMsg(err.message)
    }
    setLoaded(true)
  }

  useEffect(()=>{
    openFun()
  },[])

  const copyWholeInput = ()=>{
    const copiedTableData = JSON.stringify(tableInputs);
    localStorage.setItem('copiedSalesTableData', copiedTableData);
  
    const copiedWholeData = JSON.stringify(advanceDetails);
    localStorage.setItem('copiedSalesInputs', copiedWholeData);
  }
  
  const onChangeHandler = (e)=>{
    if(e.target.name == "CustomerName"){
      const selected = customerAndId.find(val=>val.CustomerName.toLowerCase() == e.target.value.toLowerCase() ||  val.NameInTamil.toLowerCase() == e.target.value.toLowerCase())
      // console.log(selected);
      if(selected){
        setAdvanceDetails({...advanceDetails,[e.target.name] : e.target
          .value,SalesId: selected.SalesId})
      }
      else{
        setAdvanceDetails({...advanceDetails,[e.target.name] : e.target
          .value})
      }
      return;
    }
    setAdvanceDetails({...advanceDetails,[e.target.name] : e.target
      .value})
  }
  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    const finalInput = {...advanceDetails, productDetails : tableInputs} 
    console.log({...advanceDetails, productDetails : tableInputs});
    // try{
    //   const res = await axios.post(`${EndPoint}/advanceDetails`,finalInput)
    //   console.log(res);
    // } catch(err){
    //   console.error(err);
    // }
  }
  return (
    <>
    {
      loaded && !error ?
      <TransactionTablesWithEntry
        productAndId={productAndId}
        userInputs={advanceDetails}
        setUserInputs={setAdvanceDetails}
        tableHeadsAndTypes={tableHeads}
        isAdvanceDate={true}
        transTopArr={TransactionTopArr}
        tableDatas={emptyArr}
        tableTopIcons={TopTableIcons}
        transTopArrNotIc={TransactioInputNotIcArr}
        startBread={"Transaction"}
        endBread={"Advance Order"}
        heading={"Advanced Order Booking"}
        isHeading={true}
        onChange={onChangeHandler}
        TableInputs={tableInputs}
        setTableInputs={setTableInputs}
        onSubmitHandler={onSubmitHandler}
        copyWholeInput={copyWholeInput}
    /> : !loaded ? <h1>Loading</h1> : <p>{errorMsg}</p>
    }
    </>
  )
}

export default AdvanceOrderPage