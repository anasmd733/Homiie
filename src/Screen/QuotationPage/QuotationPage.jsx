import React from 'react'
import QuotationCard from '../../Components/Quotation/QuotationCard'
import { Path } from '../../Routes/Path'
const QuotationPage = () => {
  return (
    <QuotationCard path={Path.quotationGoTable} submitPath={Path.quotationSubmitTable}/>
  )
}

export default QuotationPage