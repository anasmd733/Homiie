import React, { useEffect, useState } from 'react'
import { VehicleExpenseTableDetail } from './VehicleExpenseDetails'
import BelowTableButtonIndex from '../../Common/BelowTableButton/BelowTableButtonIndex'
import TableCard from '../../Common/ExpenseTable/TableCard'
import BlueButton from '../../Common/Submit/BlueButton'
import OptionButton from '../../Common/OptionButton/OptionButton'
import { FaRegSave } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import axios from 'axios'
import { SearchFuntion } from '../../Common/SearchBar/SearchFuction'
import "./VehicleExpens.css"
import { useNavigate } from 'react-router-dom'
import { Path } from '../../Routes/Path'
import BreadCrumbs from '../../Common/BreadCrums/BreadCrumbs'
import DeletePopUp from '../../Common/DeletePopUp/DeletePopUp'
import { EndPoint } from '../../EndPoints/EndPoint'
const VehicleExpenseTable = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [door,setdoor]=useState(false)
  const [id,setid]=useState();
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${EndPoint}/VehicleExpense`);
      setOriginalData(response.data);
      setFilteredData(response.data);
      setLoaded(true);
    } 
    catch (error) {
      console.error("Error fetching notes data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);


  useEffect(()=>{
    
    let totalExpenseAmount = 0;
    filteredData.forEach(item => {
    totalExpenseAmount += parseInt(item.Amount);
    setTotalExpenseAmount(totalExpenseAmount);
});

  },[filteredData])

  const Navigate= useNavigate();
  
  const HandleNavigate=()=>{
    Navigate(Path.vehicleExpenses)
  }

  const VehicleExpenseClick=(i)=>{
    // alert(i)
  }

  const VehicleExpenseEditClick=(i)=>{
    Navigate(`${Path.vehicleExpenses}/${i}`);
  }

  const DeleteClick=(i)=>{ 
    setid(i)
    setdoor(true)
  }
  const VehicleExpenseDeleteClick = async (id) => {
    try {
      const Deleteit=originalData[id].id
      await axios.delete(`${EndPoint}/VehicleExpense/${Deleteit}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  
  const Delete=()=>{
    VehicleExpenseDeleteClick(id);
    setdoor(false)
  }


  const VehicleExpensesNew=()=>{
    Navigate(Path.vehicleExpenses);
  }

  return (
    <>
<div>
<div className={door === true ? 'main-div-blur-Vehicle-Expense' : null} >
<BreadCrumbs onClick={HandleNavigate} BreadCrumbsvalue={"Vehicle Expense >"} />
      <BreadCrumbs  BreadCrumbsvalue={"Vehicle Expense Table"}/>
      {loaded ?
      <TableCard 
      TableWithAddArr={filteredData} 
      BelowTableButtonIndex={ <BelowTableButtonIndex/>} 
      onChange={(e)=>SearchFuntion(e,originalData,setFilteredData)}
      BlueButton={<BlueButton value={`Total Cash Received = ${totalExpenseAmount} `} className='TableCard-BlueButton-Amount'/>}
      save={<OptionButton iscricrle={true} icon={<FaRegSave fontSize={"20px"}/>}/>}
      circle={<OptionButton iscricrle={true} icon={<CiCirclePlus fontSize={"40px"}/>}/>}
      originalData={originalData}
      setFilteredData={setFilteredData}
      onClick={VehicleExpenseClick}
      onEditClick={VehicleExpenseEditClick}
      onDeleteClick={(i)=>{DeleteClick(i)}}
      AddDetail={VehicleExpensesNew}
    />    
    :
    <h1>Loading</h1>
  }
  </div>
        {
        door === true ?
        <DeletePopUp 
        className='DeletePopUp-division-Vehicle-Expense'
        CancelonClick={() => setdoor(false)}
        DeleteonClick={() => Delete()}
         />
         : null
        }
    </div>

</>
  )
}

export default VehicleExpenseTable
