import React, { useEffect, useState } from 'react'
import { useTheme } from "@mui/material";
import { VehicleExpenseDeteil } from './VehicleExpenseDetails'; 
import FormCard from '../../Common/FormCard/FormCard';
import NavButton from '../../Common/NavButton/NavButton';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Path } from '../../Routes/Path';
import { EndPoint } from '../../EndPoints/EndPoint';

const VehicleExpnsesCard = ({path}) => {

  const [detail,setdetail]=useState([])
  const [labels,setlabels]=useState(VehicleExpenseDeteil)
  const [id,setid]=useState()
  const Navigate=useNavigate()
  const{i}=useParams()

  const [data,setdata]=useState(
    {
      id: "",
      Date: "",
      VehicleNumber: "",
      Name: "",
      Amount: "",
      ExpenseReason:""
    }
  );



  const NotesData = async () => {
    try {
      const response = await axios.get(`${EndPoint}/VehicleExpense`);
      setdetail(response.data);
      if (i !== undefined && response.data[i]) {
        setlabels(VehicleExpenseDeteil[0].disable=true)
        setid(response.data[i].id,)
        const currentData = response.data[i];
        setdata({
          ...data,
          id: currentData.id,
          Date: currentData.Date,
          VehicleNumber: currentData.VehicleNumber,
          Name: currentData.Name,
          Amount: currentData.Amount,
          ExpenseReason: currentData.ExpenseReason
        });
      }
    } catch (error) {
      console.error("Error fetching notes data:", error);
    }
  };




  useEffect(() => {
    NotesData();
    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    setdata({...data,
      Date:`${year}-${month > 9 ? month : `0${month}`}-${date > 9 ? date : `0${date}`}`})

      if (i === null || i === undefined) {
        setlabels(VehicleExpenseDeteil[0].disable=false);
      }
    }, [i]);


  const onChangeHandler = (e)=>{
    setdata({...data,[e.target.name] : e.target.value})
  }




  const onsubmitHandler = async (e) => {

    if(i !== undefined && i !== ""){
      // console.log(data);
      const updateDataOnServer = async () => {
        try {
          await axios.put(`${EndPoint}/VehicleExpense/${id}`, data);
        } catch (error) {
          console.error("Error updating note:", error);
        }
      };

      updateDataOnServer()
      Navigate(Path.vehicleExpensesGoTable)
    }
    else{
    e.preventDefault();
    let maxId = 0;
    if (detail.length > 0) {
      maxId = Math.max(...detail.map(item => parseInt(item.id)));
    }
    const newId = maxId === -Infinity ? 1 : maxId + 1;

    
    setdata({
      id: newId,
      Date: data.Date,
      VehicleNumber: data.VehicleNumber,
      Name: data.Name,
      Amount: data.Amount,
      ExpenseReason: data.ExpenseReason
    });
  
    await axios.post(`${EndPoint}/VehicleExpense`, {
      ...data,
      id: newId
    });
  
    await NotesData();

    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
  
    setdata({
      id: "",
      Date: `${year}-${month > 9 ? month : `0${month}`}-${date > 9 ? date : `0${date}`}`,
      VehicleNumber: "",
      Name: "",
      Amount: "",
      ExpenseReason: ""
    });}
  };
  
  const BreadClick=()=>{
    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    setlabels(VehicleExpenseDeteil[0].disable=false);
    setdata({
      id: "",
      Date: `${year}-${month > 9 ? month : `0${month}`}-${date > 9 ? date : `0${date}`}`,
      VehicleNumber: "",
      Name: "",
      Amount: "",
      ExpenseReason: ""
    });
    Navigate(Path.vehicleExpenses)
  }
  
  return (
    <FormCard
    Heading={"Vehicle Expnses"}
    expenseDeteil={VehicleExpenseDeteil}
    path={path}
    NavigateButton={<NavButton value={"Go to Table"} className='FormCard-NavButton' 
    path={path}/>}
    BreadCrumbsvalue={"Vehicle Expnses"}
    onChange={onChangeHandler}
    onsubmitHandler={onsubmitHandler}
    inpValue={data}
    BreadCrumbsClick={BreadClick}
    />
  )
}

export default VehicleExpnsesCard
