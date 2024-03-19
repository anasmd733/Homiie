import React, { useEffect, useState } from "react";
import TransactionTablesWithEntry from "../../../Components/Transaction/Index/TransactionTablesWithEntry";
import { SalesReportsArray } from "../../../Components/DashBoard/SalesReportsArray";
import { emptyArray } from "../EmptyArr";
import {BillInputsArray,TopTableIcons,TotalCountsBelowArr} from "../BillAndTableArray";
import { TransactioInputNotIcArr, TransactionTopArr } from "./SalesDeatils.Arr";
import axios from "axios";
import SuccessPopUp from "../../../Common/PopUp/SuccessPopUp";
import ErrorPopUp from "../../../Common/PopUp/ErrorPopUp";
import { EndPoint } from "../../../EndPoints/EndPoint";

const SalesDetailsPage = () => {
  const [successPopUp, setSuccessPopUp] = useState(false)
  const [errorPopUp, setErrorPopUp] = useState(false)

  const [salesDetailsState, setSalesDetailsState] = useState([]);
  const [currentClick, setCurrentClick] = useState("");
  const [boxBalances, setBoxbalances] = useState([])

  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const tableHeads = [
    { heading: 'Product Id', dataType: 'number' },
    { heading: 'Product Name', dataType: 'text' },
    { heading: 'Mark', dataType: 'text' },
    { heading: 'Quantity', dataType: 'number' },
    { heading: 'Rate', dataType: 'number' },
    { heading: 'Total Amount', dataType: 'number' },
]
const [TableInputs, setTableInputs] = useState([])
const [salesInputs, setSalesInputs] = useState(
  {
    Date : "",
    CustomerId : "",
    CustomerName : "",
    Remarks : "",
    SalesId : "",
    Mode : null,
    TotalItems : "",
    TotalQuantity : "",
    BoxBalance : 0,
    BillAmount : "",
    PreviousBalance : 0,
    CashRecieved : "",
    NetBalance : 0
  }
)
const [customerAndId, setCustomerAndId] = useState([])
const [productAndId, setProductAndId] = useState([])
const [errorMsg, setErrMsg] = useState("")

useEffect(()=>{
  let count = 0;
  let totQuantity = 0;
  let totAmount = 0;
  let prevBal = Number(salesInputs.PreviousBalance);
    TableInputs.forEach(product => {
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
    setSalesInputs(prev=>({...prev,TotalItems:count,TotalQuantity:totQuantity, BillAmount : totAmount,NetBalance : prevBal + totAmount- prev.CashRecieved}))
},[TableInputs])

const dateFun = ()=>{
  const date = new Date();
  const dateInp = `${date.getFullYear()}-${
    date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  }-${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}`
  return dateInp;
}

const openFun = async()=>{
  setLoaded(false)
  try{
    const date = new Date();
    const dateInp = dateFun()
    const salesDetails = await axios.get(`${EndPoint}/salesDetails`)

    const boxDetails = await axios.get(`${EndPoint}/boxDetails`)
    setBoxbalances(boxDetails.data);
    // console.log(boxDetails.data);

    setSalesInputs({...salesInputs,Date : dateInp,SalesId : Number(salesDetails.data[salesDetails.data.length-1].SalesId) + 1})
    setSalesDetailsState(salesDetails.data)
    const ledgerCustomer = await axios.get(`${EndPoint}/ledgerCustomer`)
    const custAndId = [];
    console.log(ledgerCustomer.data);
    ledgerCustomer.data.forEach((val)=>{
      let data = {
        "tamil" : val.nameInTamil,
        "customerName" : val.customerName,
        "CustomerId" : val.CustomerId,
      }
      custAndId.push(data)
    })
    // console.log(custAndId);
    // console.log(custAndId);
    setCustomerAndId(custAndId);

    const productRegister = await axios.get(`${EndPoint}/productRegister`)
    const prodAndId = [];
    // console.log(productRegister.data);
    productRegister.data.forEach((val)=>{
      let data = {
        "tamil" : val.productNameTamil,
        "productName" : val.productName,
        "productId" : val.productId,
        "productRate" : val.productRate,
        "mark" : val.mark
      }
      prodAndId.push(data)
    })
    // console.log(prodAndId);
    setProductAndId(prodAndId);
    setError(false)
    setErrMsg("")
  } catch(err){
    console.error(err);
    setErrMsg(err.message)
    setError(true)
  }
  setLoaded(true)
}

useEffect(()=>{
  openFun()
},[])

const modeOnClick = (val)=>{
  setSalesInputs({...salesInputs, Mode : val})
}

const prevBalanceFinder = (value)=>{
  let lastBill = 0;
  for(let i=salesDetailsState.length-1;i>=0;i--){
    // console.log(salesDetailsState);
    if(value == salesDetailsState[i].CustomerId || value.toLowerCase() == salesDetailsState[i].CustomerName.toLowerCase()){
      lastBill = salesDetailsState[i].NetBalance
      // setSalesInputs(prev=>({...prev,PreviousBalance: lastBill.NetBalance}))
      // setSalesInputs(prev=>({...prev,PreviousBalance: lastBill.NetBalance}))
      break;
    }
    else{
      lastBill = 0;
      // setSalesInputs(prev=>({...prev,PreviousBalance: 0}))
      // console.log({...salesInputs, PreviousBalance: 0 });
    }
  }
  return lastBill;
}
// console.log(boxBalances);
const onChangeHanler = (e)=>{
  if(e.target.name == "CustomerId"){
    const selectedCustomer = customerAndId.find(customer => customer.CustomerId === parseInt(Number(e.target.value), 10));
    let prevBalance = prevBalanceFinder(e.target.value)
    const netBalance = Number(salesInputs.BillAmount) + Number(prevBalance) - salesInputs.CashRecieved;
    if(selectedCustomer){
      const boxBalance = boxBalances.find(bal=>bal["Customer Name"].toLowerCase() == selectedCustomer.customerName.toLowerCase())
      // const cashReceivedValue = e.target.value !== "" ? Number(e.target.value) : "";
      if(boxBalance){
        setSalesInputs(prev=>({...prev,CustomerId : Number(e.target.value), CustomerName : selectedCustomer.customerName, PreviousBalance : prevBalance, NetBalance : netBalance, BoxBalance: boxBalance.Balance
        })) 
      }
      else{
        setSalesInputs(prev=>({...prev,CustomerId : Number(e.target.value), CustomerName : selectedCustomer.customerName, PreviousBalance : prevBalance, NetBalance : netBalance, BoxBalance: 0
        }))
      }
    } else{
      // prevBalanceFinder("")
      setSalesInputs({...salesInputs,CustomerId : e.target.value, CustomerName: "",PreviousBalance : 0, NetBalance : netBalance })
    }
  }
  else if(e.target.name == "CustomerName"){
    const selectedCustomer = customerAndId.find(customer => customer.customerName.toLowerCase() === e.target.value.toLowerCase());
    // console.log(selectedCustomer);
    let prevBalance = prevBalanceFinder(e.target.value)
    const netBalance = Number(salesInputs.BillAmount) + Number(prevBalance) - salesInputs.CashRecieved;
    if(selectedCustomer){
        const boxBalance = boxBalances.find(bal=>bal["Customer Name"].toLowerCase() == selectedCustomer.customerName.toLowerCase())
        // console.log(boxBalance);
        // console.log(boxBalance);
        // prevBalanceFinder(e.target.value)
        if(boxBalance){
          setSalesInputs({...salesInputs, CustomerName : selectedCustomer.customerName, CustomerId : selectedCustomer.CustomerId, PreviousBalance : prevBalance, NetBalance : netBalance,BoxBalance:boxBalance.Balance
          }) 
        }
        else{
          setSalesInputs({...salesInputs, CustomerName : selectedCustomer.customerName, CustomerId : selectedCustomer.CustomerId, PreviousBalance : prevBalance, NetBalance : netBalance,BoxBalance:0
          }) 
        }
    } else{
      prevBalanceFinder("")
      setSalesInputs({...salesInputs,CustomerName : e.target.value, CustomerId:"", PreviousBalance : 0, NetBalance : netBalance,BoxBalance:0 })
    }
  }
  else if(e.target.name === "CashRecieved"){
    const cashReceivedValue = e.target.value !== "" ? Number(e.target.value) : "";
    const netBalance = Number(salesInputs.BillAmount) + Number(salesInputs.PreviousBalance) - cashReceivedValue;
    setSalesInputs(prev => ({...prev, CashRecieved: cashReceivedValue, NetBalance: netBalance }));
  }
  else if(e.target.name == "Remarks" || e.target.name == "BoxBalance" || e.target.name == "CustomerName"){
    setSalesInputs({...salesInputs,[e.target.name] : e.target.value})
  }
}

const onSubmitHandler = async (e)=>{
  e.preventDefault();
  setLoaded(false);
  setError(false)
  setErrMsg("")
  try{
    if(salesInputs.Mode){
      const filteredTableData = TableInputs.filter(obj => {
        return Object.entries(obj).every(([key, value]) => {
          if (key === "Mark") {
            return true;
          } else if (value !== "") {
            return true;
          }
          return false;
        });
      });
      const finalInputs = {...salesInputs,productDetails : filteredTableData}
      const res = await axios.post(`${EndPoint}/salesDetails`,finalInputs)
      console.log(res);
      setSuccessPopUp(true)
      try{
        const salesDetails = await axios.get(`${EndPoint}/salesDetails`)
        setSalesDetailsState(salesDetails.data)
        let tempSalesObj = {};
        let tempTableObj = {};
        const dateInp = dateFun();
        Object.keys(salesInputs).forEach((val)=>val== "Date" ? tempSalesObj[val]=dateInp : val == "Mode" ? tempSalesObj[val] == null :tempSalesObj[val]="" )
        Object.keys(TableInputs[0]).forEach((val)=>tempTableObj[val]="")
        setSalesInputs({...tempSalesObj, SalesId : Number(salesDetails.data[salesDetails.data.length-1].SalesId) + 1})
        setTableInputs([tempTableObj])
        setCurrentClick("")
        setError(false)
        setErrMsg("")
      } catch(err){
        setError(true)
        setErrMsg(err.message)
      }
    }
    else{
      alert("Choose the Payment Type")
    }
  }
  catch(err){
      console.error(err);
      // setErrMsg(err.message)
      // setError(true)
      setErrorPopUp(true)
  }
  setLoaded(true)
}

const copyWholeInput = ()=>{
  const copiedTableData = JSON.stringify(TableInputs);
  localStorage.setItem('copiedSalesTableData', copiedTableData);

  const copiedWholeData = JSON.stringify(salesInputs);
  localStorage.setItem('copiedSalesInputs', copiedWholeData);
}

const pasteWholeInput = ()=>{
  const storedTableData = localStorage.getItem('copiedSalesTableData');
  const storedInputs = localStorage.getItem('copiedSalesInputs');
  if (storedTableData || storedInputs) {
    const parsedTableData = JSON.parse(storedTableData);
    const parsedUserInputs = JSON.parse(storedInputs);
    const prevBalance = prevBalanceFinder(parsedUserInputs.CustomerName)
    // const isProdChange = Object.keys(parsedTableData).some(val => val == "Product Quantity")
    // if(!isProdChange){
      setTableInputs(parsedTableData);
    // }
    // else{
    //   let newObj = {...parsedTableData,Quantity : parsedTableData["Product Quantity"]}
    //   delete newObj["Product Quantity"]
    //   setTableInputs(newObj)
    //   console.log(newObj);
    // }
    setCurrentClick(parsedUserInputs.Mode && parsedUserInputs.Mode);
    // console.log(parsedTableData);
    // console.log(parsedUserInputs);
    let isAdvanced = Object.keys(parsedUserInputs).some(val=>val == "AdvanceAmount");
    // console.log(isAdvanced);
    if(!isAdvanced){
      setSalesInputs({...parsedUserInputs,SalesId : salesInputs.SalesId, Date : salesInputs.Date, PreviousBalance : prevBalance})
    }
    else{
      const newObj = {...parsedUserInputs,SalesId : salesInputs.SalesId, Date : salesInputs.Date, PreviousBalance : prevBalance, CashRecieved : parsedUserInputs.AdvanceAmount}
      delete newObj.AdvanceAmount;
      setSalesInputs(newObj)
      // console.log(newObj);
    }
  }
}

  return (
    <div>
      {/* <div> */}
        <SuccessPopUp isSuccess={successPopUp} setIsSuccess={setSuccessPopUp} message={"Successfully Completed ! "} />
        <ErrorPopUp isFailed={errorPopUp} setIsFailed={setErrorPopUp} message={"Failed ! "} />
      {/* </div> */}
      {
        loaded && !error ? 
          <TransactionTablesWithEntry
            productAndId={productAndId}
            userInputs={salesInputs}
            setUserInputs={setSalesInputs}
            tableHeadsAndTypes={tableHeads}
            transTopArr={TransactionTopArr}
            tableDatas={emptyArray}
            tableTopIcons={TopTableIcons}
            transTopArrNotIc={TransactioInputNotIcArr}
            totCountBelArr={TotalCountsBelowArr}
            billInputs={BillInputsArray}
            startBread={"Transaction Sales"}
            endBread={"Sales Bill"}
            isBillButton={true}
            onChange={onChangeHanler}
            onSubmitHandler={onSubmitHandler}
            TableInputs = {TableInputs}
            setTableInputs = {setTableInputs}
            isBoxBalance={true}
            modeOnClick={modeOnClick}
            currentClick={currentClick}
            setCurrentClick={setCurrentClick}
            copyWholeInput={copyWholeInput}
            pasteWholeInput={pasteWholeInput}
          /> : !loaded ? <h1>Loading</h1> : <h1>{errorMsg}</h1>
      }
    </div>
  );
};

export default SalesDetailsPage;