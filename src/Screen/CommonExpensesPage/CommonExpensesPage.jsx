import React from 'react'
import CommanExpenseCard from '../../Components/CommanExpenses/CommanExpenseCard'
import { Path } from '../../Routes/Path'
const CommonExpensesPage = () => {
  return (
    <CommanExpenseCard path={Path.commonExpensesGoTable}/>
  )
}

export default CommonExpensesPage