import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import { HiOutlineSortDescending } from "react-icons/hi";
import { FaPrint } from "react-icons/fa";
import FilterButton from "../FilterButton/FilterButton"
import './ExpenseTableStyle.css'
import BlueButton from '../Submit/BlueButton';
import OptionButton from '../OptionButton/OptionButton';

const ExpenseTableHead = ({save , circle}) => {
  return (
  
      <div className='ExpenseTable-Top-Bar'> 
      
      <SearchBar className='ExpenseTableHead-SearchBar'/>
      
      {circle}

      <OptionButton iscricrle={true} icon={<HiOutlineSortDescending fontSize={"20px"}/>}/>

      {save}

      <BlueButton value={"Export to Excel"} className='ExpenseTableHead-BlueButton'/>

      <OptionButton iscricrle={false} icon={<FaPrint fontSize={"20px"}/>}/>

      <FilterButton/>
  
      </div>
    
  )
}

export default ExpenseTableHead
