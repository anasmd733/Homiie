import React, { useEffect } from 'react'
import { CommanExpensesDeteils } from './CommanExpensesDeteils';
import FormCard from '../../Common/FormCard/FormCard';
import NavButton from '../../Common/NavButton/NavButton';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Path } from '../../Routes/Path';
const CommanExpenseCard = ({path}) => {

  const [detail,setdetail]=useState([])
  const [labels,setlabels]=useState(CommanExpensesDeteils)
  const [id,setid]=useState()
  const Navigate=useNavigate()
  const{i}=useParams()

  const [data, setdata] = useState({
    id: "",
    Date: "",
    Name: "",
    ExpenseReason: "",
    ExpenseAmount: ""
  });
  

  const NotesData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/CommanExpense");
      setdetail(response.data);
      if (i !== undefined && response.data[i]) {
        setlabels(CommanExpensesDeteils[0].disable=true)
        const currentData = response.data[i];
        setid(currentData.id);
  
        setdata(prevData => ({
          ...prevData,
          id: currentData.id,
          Date: currentData.Date,
          Name: currentData.Name,
          ExpenseReason: currentData.ExpenseReason,
          ExpenseAmount: currentData.ExpenseAmount
        }));
      }
    } 
  
    catch (error) {
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
        setlabels(CommanExpensesDeteils[0].disable=false);
      }
    }
    
    , [i]);


 




  const onChangeHandler = (e)=>{
    setdata({...data,[e.target.name] : e.target.value})
    console.log();
  }
  
  const onsubmitHandler = async (e) => {
    if(i !== undefined && i !== ""){
      // console.log(data);
      const updateDataOnServer = async () => {
        try {
          await axios.put(`http://localhost:3000/CommanExpense/${id}`, data);
        } catch (error) {
          console.error("Error updating note:", error);
        }
      };
      updateDataOnServer()
      Navigate(Path.commonExpensesGoTable)
    }

    else{
    e.preventDefault();
  
    const maxId = Math.max(...detail.map(item => parseInt(item.id)));
    const newId = isNaN(maxId) ? 1 : maxId + 1;
  
    setdata({
      id: newId,
      Date: data.Date,
      Name: data.Name,
      ExpenseReason: data.ExpenseReason,
      ExpenseAmount: data.ExpenseAmount
    });
  
    await axios.post("http://localhost:3000/CommanExpense", {
      ...data,
      id: newId.toString()
    });
  
    await NotesData();

    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    
    setdata({
      id: "",
      Date: `${year}-${month > 9 ? month : `0${month}`}-${date > 9 ? date : `0${date}`}`,
      Name: "",
      ExpenseReason: "",
      ExpenseAmount: ""
    });
    e.target.submit();

  }
  };
  const BreadClick=()=>{
    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    setlabels(CommanExpensesDeteils[0].disable=false)
    setdata({
      id: "",
      Date: `${year}-${month > 9 ? month : `0${month}`}-${date > 9 ? date : `0${date}`}`,
      Name: "",
      ExpenseReason: "",
      ExpenseAmount: ""
    });
    Navigate(Path.commonExpenses)
  }

  return (
    
       <FormCard
       Heading={"Comman Expense"}
       expenseDeteil={CommanExpensesDeteils}
       path={path}
       NavigateButton={<NavButton value={"Go to Table"} className='FormCard-NavButton' 
       path={path}/>}
       BreadCrumbsvalue={"Comman Expenses"}
       onChange={onChangeHandler}
       onsubmitHandler={onsubmitHandler}
       inpValue = {data}
       BreadCrumbsClick={BreadClick}
       />
  )
}

export default CommanExpenseCard
