import React from 'react'
import ExpenseTableHead from './ExpenseTableHead'
import TableWithAdd from '../TableWithAdd/TableWithAdd'
import './ExpenseTableStyle.css'
import ReportsHeadSearchComp from '../../Components/ReportsComponent/ReportsHeadSearchComp'
// <<<<<<< HEAD
// const TableCard = ({TableWithAddArr,BelowTableButtonIndex,BlueButton,save,circle ,            onChange , originalData , setFilteredData ,onClick , setkey}) => {
// =======
const TableCard = ({TableWithAddArr,BelowTableButtonIndex,BlueButton,save,circle , onChange , originalData , setFilteredData ,onClick ,onEditClick ,onDeleteClick ,AddDetail}) => {
  return (
    <div>
      <div className='TableCard-table-division'>
      <ReportsHeadSearchComp 
       addIcon={true}
       onChange={onChange}
       originalData={originalData}
       setFilteredData={setFilteredData}
       AddDetail={AddDetail}
       />
      <br />
      <TableWithAdd onDeleteClick={onDeleteClick} onEditClick={onEditClick} onClick={onClick} TableWithAddArr={TableWithAddArr}/>
      {BlueButton}
      </div>
      <div className='TableCard-BelowTableButtonIndex-div'>
        {BelowTableButtonIndex}
      </div>
    </div>
  )
}

export default TableCard
