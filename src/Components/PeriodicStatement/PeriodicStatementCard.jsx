import React, { useContext, useEffect, useState } from 'react'
import { PeriodicStatement } from './PeriodicStateDetails';
import FormCard from '../../Common/FormCard/FormCard';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../Routes/Path';
import MyContext from '../../Common/MyContext/MyContext';
const PeriodicStatementCard = ({path}) => {
  const { setPeriodicStatementValue } = useContext(MyContext);
  const Navigate=useNavigate()
  const [customerData,setCustomerData]=useState(
    {
      Name : "",
      ledgerType : "",
      FromDate : "",
      ToDate : "",
    }
  );


  const onChangeHandler = (e)=>{
    setCustomerData({...customerData,[e.target.name] : e.target.value})
  }


  const onsubmitHandler = async (e) => {
    e.preventDefault();
  
    const fromDate = new Date(customerData.FromDate);
    const today = new Date();
  
    if (customerData.FromDate > customerData.ToDate) {
      alert("FromDate cannot be greater than today's date.");
      return;
    }
  else{
    setPeriodicStatementValue(customerData);
    Navigate(Path.periodicStatementGoTable);
    setCustomerData({
      Name: "",
      FromDate: "",
      ToDate: "",
    });
  };}
  
  


  return (
    <FormCard
    Heading={"Periodic Statement"}
    expenseDeteil={PeriodicStatement}
    path={path}
    // onClick={onclickHandler}
    // pathState={"true"}
    BreadCrumbsvalue={"Periodic Statement"}
    onChange={onChangeHandler}
    onsubmitHandler={onsubmitHandler}
    inpValue = {customerData}
    isRadio={true}
    />
  )
}

export default PeriodicStatementCard