import React, { useState } from 'react'
import "./PaymentReceiptStyle.css"
import GreenHoverButton from '../../Common/GreenHoverButton/GreenHoverButton'
import IncomeDetailsCopm from './IncomeDetails/IncomeDetailsCopm'
import ExpenseDetailsComp from './ExpenseDetails/ExpenseDetailsComp'
const PaymentReceipt = () => {

  const [selected, setSelected] = useState("income");

  return (
    <div>
    <div className='PaymentReceipt-Top-Button-div'>
    <GreenHoverButton 
    value={"Income Details"}
    className={"paymentReciptBtn"}
    style={{
      flex: "1",
      backgroundColor: selected == "income" ? "#68D183" : "white",
      color : selected == "income" ? "white" : "#333A44"
    }}
    onClick = {()=>setSelected("income")}
     />

    <GreenHoverButton 
    value={"Expense Details"}
    className={"paymentReciptBtn"}
    style={{
      flex: "1",
      backgroundColor: selected == "expense" ? "#68D183" : "white",
      color : selected == "expense" ? "white" : "#333A44"
    }}
    onClick = {()=>setSelected("expense")}
    />
    </div>

    <div>
      {
        selected == "income" ? <IncomeDetailsCopm/> : <ExpenseDetailsComp/>
      }
    </div>

    </div>
  )
}

export default PaymentReceipt
