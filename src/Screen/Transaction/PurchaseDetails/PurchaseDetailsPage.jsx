import React, { useEffect, useState } from 'react'
import TransactionTablesWithEntry from '../../../Components/Transaction/Index/TransactionTablesWithEntry'
import { TransactioInputNotIcArr, TransactionTopArr } from './PurchaseDetailsArr'
import { emptyArray } from '../EmptyArr'
import { BillInputsArray, TopTableIcons, TotalCountsBelowArr } from '../BillAndTableArray'
import axios from 'axios'
import SuccessPopUp from '../../../Common/PopUp/SuccessPopUp'
import ErrorPopUp from '../../../Common/PopUp/ErrorPopUp'
import { EndPoint } from '../../../EndPoints/EndPoint'

const PurchaseDetailsPage = () => {

  const [successPopUp, setSuccessPopUp] = useState(false)
  const [errorPopUp, setErrorPopUp] = useState(false)

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("")
  const [supplierAndId,setSupplierAndId] = useState([])
  const [productAndId, setProductAndId] = useState([])
  const [purchaseDetailsState, setPurchaseDetailsState] = useState([])
  const tableHeads = [
    { heading: 'Product Id', dataType: 'number' },
    { heading: 'Product Name', dataType: 'text' },
    { heading: 'Mark', dataType: 'text' },
    { heading: 'Quantity', dataType: 'number' },  
    { heading: 'Rate', dataType: 'number' },
    { heading: 'Total Amount', dataType: 'number' },
]
const [purchaseInputs, setPurchaseInputs] = useState(
  {
    Date : "",
    SupplierName : "",
    Remarks : "",
    PurchaseId : "",
    SupplierId : "",
    Mode : null,
    TotalItems : "",
    TotalQuantity : "",
    BillAmount : "",
    PreviousBalance : "",
    CashRecieved : "",
    NetBalance : ""
  }
)
const [tableInputs, setTableInputs] = useState([])
const [currentClick, setCurrentClick] = useState("")

useEffect(()=>{
  let count = 0;
  let totQuantity = 0;
  let totAmount = 0;
  let prevBal = Number(purchaseInputs.PreviousBalance);
    tableInputs.forEach(product => {
      if (product["Product Id"] !== "" && product["Product Name"] !== "") {
        ++count;
      }
      if(product["Quantity"] > 0){
        totQuantity += Number(product["Quantity"])
      }
      if(product["Total Amount"] > 0){
        totAmount += Number(product["Total Amount"])
      }
    });
    setPurchaseInputs(prev=>({...prev,TotalItems:count,TotalQuantity:totQuantity, BillAmount : totAmount,NetBalance : prevBal + totAmount- prev.CashRecieved}))
},[tableInputs])

const dateFun = ()=>{
  const date = new Date();
    const dateInp = `${date.getFullYear()}-${
    date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  }-${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}`
  return dateInp;
}

useEffect(()=>{
    const dateInp = dateFun()
    const openFun = async()=>{
    try{
      const purchaseDetails = await axios.get(`${EndPoint}/purchaseDetails`)
      setPurchaseInputs({...purchaseInputs,Date : dateInp,PurchaseId : Number(purchaseDetails.data[purchaseDetails.data.length-1].PurchaseId) + 1})
      setPurchaseDetailsState(purchaseDetails.data)

      const ledgerSupplier = await axios.get(`${EndPoint}/ledgerSupplier`);
      const suppAndId = [];
      ledgerSupplier.data.forEach((val)=>{
        let data = {
          "tamil" : val.nameInTamil,
          "supplierName" : val.supplierName,
          "SupplierId" : val.SupplierId,
        }
        suppAndId.push(data)
      })
      // console.log(custAndId);
      setSupplierAndId(suppAndId)

      const productRegister = await axios.get(`${EndPoint}/productRegister`)
      const prodAndId = [];
      // console.log(productRegister.data);
      productRegister.data.forEach((val)=>{
        let data = {
          "tamil" : val.productNameTamil,
          "productName" : val.productName,
          "productId" : val.productId,
          "productRate" : val.productRate
        }
        prodAndId.push(data)
      })
      // console.log(prodAndId);
      setProductAndId(prodAndId);
      setError(false)
      setErrMsg("")
    } catch(err){
      console.error(err.stack);
      setError(true)
      setErrMsg(err.stack)
    }
    setLoaded(true)
  }
  openFun()
},[])

const modeOnClick = (val)=>{
  setPurchaseInputs({...purchaseInputs, Mode : val})
}

const prevBalanceFinder = (value)=>{
  let lastBill = 0;
  for(let i=purchaseDetailsState.length-1;i>=0;i--){
    // console.log(purchaseDetailsState);
    if(value == purchaseDetailsState[i].SupplierId || value.toLowerCase() == purchaseDetailsState[i].SupplierName.toLowerCase()){
      lastBill = purchaseDetailsState[i].NetBalance
      // console.log(purchaseDetailsState);
      break;
    }
    else{
      lastBill = 0;
    }
  }
  return lastBill;
}

const onChangeHandler = (e)=>{
  if(e.target.name == "SupplierId"){
    const selectedSupplier = supplierAndId.find(supplier => supplier.SupplierId === parseInt(Number(e.target.value), 10));
    let prevBalance = prevBalanceFinder(e.target.value)
    const netBalance = Number(purchaseInputs.BillAmount) + Number(prevBalance) - purchaseInputs.CashRecieved;
    // console.log(selectedSupplier);
    if(selectedSupplier){
      // const cashReceivedValue = e.target.value !== "" ? Number(e.target.value) : "";
      setPurchaseInputs(prev=>({...prev,SupplierId : Number(e.target.value), SupplierName : selectedSupplier.supplierName, PreviousBalance : prevBalance, NetBalance : netBalance
      }))
    } else{
      // prevBalanceFinder("")
      setPurchaseInputs({...purchaseInputs, SupplierId : e.target.value, SupplierName: "",PreviousBalance : 0, NetBalance : netBalance })
    }
  }
  else if(e.target.name == "SupplierName"){
    const selectedSupplier = supplierAndId.find(supplier => supplier.supplierName.toLowerCase() === e.target.value.toLowerCase());
        let prevBalance = prevBalanceFinder(e.target.value)
        const netBalance = Number(purchaseInputs.BillAmount) + Number(prevBalance) - purchaseInputs.CashRecieved;
        // console.log(selectedSupplier);
    if(selectedSupplier){
        // prevBalanceFinder(e.target.value)
        setPurchaseInputs({...purchaseInputs, SupplierName :selectedSupplier.supplierName, SupplierId : selectedSupplier.SupplierId, PreviousBalance : prevBalance, NetBalance : netBalance
      })
    } else{
      prevBalanceFinder("")
      setPurchaseInputs({...purchaseInputs,SupplierName : e.target.value, SupplierId:"", PreviousBalance : 0, NetBalance : netBalance })
    }
  }
  else if(e.target.name === "CashRecieved"){
    const cashReceivedValue = e.target.value !== "" ? Number(e.target.value) : "";
    const netBalance = Number(purchaseInputs.BillAmount) + Number(purchaseInputs.PreviousBalance) - cashReceivedValue;
    setPurchaseInputs(prev => ({...prev, CashRecieved: cashReceivedValue, NetBalance: netBalance }));
  }
  else if(e.target.name == "Remarks" || e.target.name == "BoxBalance"){
    setPurchaseInputs({...purchaseInputs,[e.target.name] : e.target.value})
  }
}

const onSubmitHandler = async (e)=>{
  e.preventDefault()
  setLoaded(false)
  setError(false)
  setErrMsg("")
  // console.log({...purchaseInputs, productDetails : tableInputs});
  const finalInputs = {...purchaseInputs, productDetails : tableInputs}
  // console.log(finalInputs);
  if(purchaseInputs.Mode){
    try{
      const res = await axios.post(`${EndPoint}/purchaseDetails`, finalInputs)
      console.log(res);
      setSuccessPopUp(true)
      try{
        const purchaseDetails = await axios.get(`${EndPoint}/purchaseDetails`)
        // setPurchaseInputs({...purchaseInputs,Date : dateInp,PurchaseId : Number(purchaseDetails.data[purchaseDetails.data.length-1].PurchaseId) + 1})
        setPurchaseDetailsState(purchaseDetails.data)
        let tempPurchaseObj = {};
        let tempTableObj = {};
        const dateInp = dateFun();
        Object.keys(purchaseInputs).forEach((val)=>val== "Date" ? tempPurchaseObj[val]=dateInp : val == "Mode" ? tempPurchaseObj[val] == null :tempPurchaseObj[val]="" )
        Object.keys(tableInputs[0]).forEach((val)=>tempTableObj[val]="")
        // console.log(tempPurchaseObj);
        setPurchaseInputs({...tempPurchaseObj,PurchaseId : Number(purchaseDetails.data[purchaseDetails.data.length-1].PurchaseId) + 1})
        setTableInputs([tempTableObj])
        setCurrentClick("")
        // console.log(finalInputs);
        // dateFun()
        setError(false)
        setErrMsg("")
      } catch(err){
        setError(true)
        setErrMsg(err.message)
      }
    }
    catch(err){
      console.error(err);
      setErrMsg(err.message)
      setError(true)
      setErrorPopUp(true)
    }
  } else{
    alert("Choose Payment Type")
  }
  setLoaded(true)
}

const copyWholeInput = ()=>{
  const copiedTableData = JSON.stringify(tableInputs);
  localStorage.setItem('copiedPurchaseTableData', copiedTableData);

  const copiedWholeData = JSON.stringify(purchaseInputs);
  localStorage.setItem('copiedPurchaseInputs', copiedWholeData);
}
const pasteWholeInput = ()=>{
  const storedTableData = localStorage.getItem('copiedPurchaseTableData');
  const storedInputs = localStorage.getItem('copiedPurchaseInputs');
  if (storedTableData || storedInputs) {
    const parsedTableData = JSON.parse(storedTableData);
    const parsedUserInputs = JSON.parse(storedInputs);
    const prevBalance = prevBalanceFinder(parsedUserInputs.SupplierName)
    setTableInputs(parsedTableData);
    setCurrentClick(parsedUserInputs.Mode)
    setPurchaseInputs({...parsedUserInputs,PurchaseId : purchaseInputs.PurchaseId, Date : purchaseInputs.Date, PreviousBalance : prevBalance})
  }
}

  return (
    <div>
      <SuccessPopUp isSuccess={successPopUp} setIsSuccess={setSuccessPopUp} message={"Successfully Completed ! "} />
      <ErrorPopUp isFailed={errorPopUp} setIsFailed={setErrorPopUp} message={"Failed ! "} />
      {
        loaded && !error ?
        <TransactionTablesWithEntry
          productAndId={productAndId}
          userInputs={purchaseInputs}
          tableHeadsAndTypes={tableHeads}
          transTopArr={TransactionTopArr}
          tableDatas={emptyArray}
          tableTopIcons={TopTableIcons}
          transTopArrNotIc={TransactioInputNotIcArr}
          totCountBelArr={TotalCountsBelowArr}
          billInputs={BillInputsArray}
          startBread={"Transaction"}
          endBread={"Purchase Bill"}
          isBillButton={true}
          onChange={onChangeHandler}
          onSubmitHandler={onSubmitHandler}
          TableInputs={tableInputs}
          setTableInputs={setTableInputs}
          modeOnClick={modeOnClick}
          currentClick={currentClick}
          setCurrentClick={setCurrentClick}
          copyWholeInput={copyWholeInput}
          pasteWholeInput={pasteWholeInput}
        /> : !loaded? <h1>Loading</h1> : <p>{errMsg}</p>
      }
    </div>
  )
}

export default PurchaseDetailsPage