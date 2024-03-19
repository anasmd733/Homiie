import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableCard from '../../Common/ExpenseTable/TableCard';
import BlueButton from '../../Common/Submit/BlueButton';
import OptionButton from '../../Common/OptionButton/OptionButton';
import { CiCirclePlus } from "react-icons/ci";
import BelowTableButtonIndex from '../../Common/BelowTableButton/BelowTableButtonIndex';
import { SearchFuntion } from '../../Common/SearchBar/SearchFuction';
import BreadCrumbs from '../../Common/BreadCrums/BreadCrumbs';
import { Path } from '../../Routes/Path';
import { useNavigate } from 'react-router-dom';
import DeletePopUp from '../../Common/DeletePopUp/DeletePopUp';
import "./CommonExpense.css"
import { EndPoint } from '../../EndPoints/EndPoint';
const CommanExpensesTable = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [door,setdoor]=useState(false)
  const [id,setid]=useState()
  const [totalExpenseAmount, setTotalExpenseAmount] = useState();
  
  const fetchData = async () => {
    try {
      const response = await axios.get(`${EndPoint}/CommanExpense`);
      setOriginalData(response.data);
      setFilteredData(response.data);
      setLoaded(true);
    } catch (error) {
      console.error("Error fetching notes data:", error);
    }
  };

  useEffect(()=>{
    const TotalAmount=async()=>{
      let totalExpenseAmount = 0;
      filteredData.forEach(item => {
      totalExpenseAmount += parseInt(item.ExpenseAmount);
      setTotalExpenseAmount(totalExpenseAmount);
      });
    }
    TotalAmount()
  },[filteredData])


  useEffect(() => {
    fetchData();
  }, []);



  const Navigate= useNavigate()
  const HandleNavigate=()=>{
    Navigate(Path.commonExpenses)
  }
  const CommanExpenseClick=(i)=>{
    // alert(i)
  }

  const CommanExpenseEditClick=(i)=>{
    Navigate(`${Path.commonExpenses}/${i}`);
  }

  const DeleteClick=(i)=>{ 
    setid(i)
    setdoor(true)
  }

  const Delete=()=>{
    CommonExpenseDeleteClick(id);
    setdoor(false)
  }
  const CommonExpenseDeleteClick = async (id) => {
    try {
      // console.log(id);
      const Deleteit=originalData[id].id;
      console.log(Deleteit);
      await axios.delete(`${EndPoint}/CommanExpense/${Deleteit}`);
      fetchData();
      TotalAmount();
    } 
    catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const CommanExpensesNew=()=>{
    Navigate(Path.commonExpenses);  
  }


  return (
    <div>
    <div className={door === true ? 'main-div-blur-common-expenses' : null}>

    <BreadCrumbs onClick={HandleNavigate} BreadCrumbsvalue={"Comman Expense >"}  className='Notes-BreadCrumbs'/>
    <BreadCrumbs  BreadCrumbsvalue={"Comman Expense Table"}  className='Notes-BreadCrumbs'/>
    
      {loaded ?
      <TableCard
          TableWithAddArr={filteredData}
          onChange={(e)=>SearchFuntion(e,originalData,setFilteredData)}
          BelowTableButtonIndex={<BelowTableButtonIndex />}
          BlueButton={<BlueButton value={`Total Cash Received = ${totalExpenseAmount}`} className='TableCard-BlueButton-Amount' />}
          circle={<OptionButton iscricrle={true} icon={<CiCirclePlus fontSize={"40px"} />} />}
          originalData={originalData}
          setFilteredData={setFilteredData}
          onClick={CommanExpenseClick}
          onEditClick={CommanExpenseEditClick}
          onDeleteClick={(i)=>{DeleteClick(i)}}
          AddDetail={CommanExpensesNew}
        />
     
        :
        <h1>Loading</h1>
      }
      </div>
      {
        door === true ?
        <DeletePopUp 
        className='DeletePopUp-division-common-expenses'
        CancelonClick={() => setdoor(false)}
        DeleteonClick={() => Delete()}/>
        : null
       }
    </div>
  );
};

export default CommanExpensesTable;
