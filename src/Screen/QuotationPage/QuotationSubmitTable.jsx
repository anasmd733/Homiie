import React from 'react'
import CustomerQuotationTable from '../../Components/Quotation/CustomerQuotationTable'
import { Path } from '../../Routes/Path'
const QuotationSubmitTable = () => {
  return (
   <CustomerQuotationTable location={Path.quotationGoTable}/>
   
  )
}

export default QuotationSubmitTable
