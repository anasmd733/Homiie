import React from 'react'
import TransactionTopInputs from '../../../Common/TopOfTableInputs/TransactionTopInputs/TransactionTopInputs'
import TransactionInputsWithIcons from '../../../Common/TopOfTableInputs/TransactionInputsWithIcons/TransactionInputsWithIcons'
import Table1 from '../../../Common/Table/Table'
import TotalCountsBelowTable from '../../../Common/BelowTableInputs/TotalCounts/TotalCountsBelowTable'
import BillDetailsInput from '../../../Common/BelowTableInputs/BillDetailsInput/BillsInputBelowTable'
import SubmitButton from '../../../Common/Submit/SubmitButton'
import BelowTableButtonIndex from '../../../Common/BelowTableButton/BelowTableButtonIndex'
// import ExpenseTableHead from '../../../Common/ExpenseTable/ExpenseTableHead'
import Paragraph from '../../../Common/Paragraph/Paragraph'
import ReportsHeadSearchComp from '../../ReportsComponent/ReportsHeadSearchComp'
import TableWithUserInput from '../../../Common/TableWithUserInput/TableWithUserInput'
import './style.css'
import BreadCrumbs from '../../../Common/BreadCrums/BreadCrumbs'

const TransactionTablesWithEntry = ({tableDatas, transTopArr, tableTopIcons, transTopArrNotIc, totCountBelArr, billInputs, startBread, endBread, isBillButton,isExportToExcel,isHeading, heading, isSaveButton, isAdvanceDate, onChange, tableHeadsAndTypes, userInputs, setUserInputs, onSubmitHandler, TableInputs, setTableInputs, isBoxBalance, modeOnClick, productAndId, currentClick, setCurrentClick, copyWholeInput, pasteWholeInput, date, customerNames, boxDetails  }) => {
    // console.log(userInputs);

// const copyTableFun = () => {
//     const copiedData = JSON.stringify(TableInputs);
//     localStorage.setItem('copiedTaxbleData', copiedData);
//     // console.log(copiedData);
//   };


const copyTableFun = () => {
    const copiedData = JSON.stringify(TableInputs);
    navigator.clipboard.writeText(copiedData)
      .then(() => console.log('Table data copied to clipboard'))
      .catch(error => console.error('Copy to clipboard failed:', error));
  };

//   const pasteTableFun = () => {
//     const storedData = localStorage.getItem('copiedTableData');
//     if (storedData) {
//       const parsedData = JSON.parse(storedData);
//       setTableInputs(parsedData);
//     }
//   };

  return (
    <div>
        <div style={{fontWeight: "100",fontSize: "13px",color: "rgb(147, 147, 147)",cursor:"pointer",margin: "5px 0px 10px 0px"}}>{startBread} <b>{">"}</b> {endBread} </div>
        <form onSubmit={onSubmitHandler}>
        <div id='transaction' className='transaction-white-div'>
            <div>
                {isExportToExcel && <ReportsHeadSearchComp  addIcon={true}/>}
                
                {isHeading &&
                <div className='trans-head'>
                     <Paragraph style={{fontSize:"17px",fontWeight:"bold"}} value={heading}/>
                </div>
                }
                <div className='trans-inp-par'>
                    <div>
                        <TransactionTopInputs userInputs={userInputs} setUserInputs={setUserInputs}  isAdvanceDate={isAdvanceDate} onChange={onChange} TransactionTopArr={transTopArr}/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <TransactionInputsWithIcons copyWholeInput={copyWholeInput} pasteWholeInput={pasteWholeInput} currentClick={currentClick} setCurrentClick={setCurrentClick} modeOnClick={modeOnClick} userInputs={userInputs} setUserInputs={setUserInputs} onChange={onChange} TopTableIcons={tableTopIcons} TransactioInputNotIcArr={transTopArrNotIc} isBillButton={isBillButton}  />
                    </div>
                </div>
            <div style={{minHeight:"30vh",marginBottom:"20px"}}>
                <TableWithUserInput customerNames={customerNames} boxDetails={boxDetails} date={date} productAndId={productAndId} tableData={TableInputs} setTableData = {setTableInputs} headsDataTypes={tableHeadsAndTypes}/>
                {/* <Table1 tableDatas={tableDatas}/> */}
            </div>
            <div className='trans-inp-par'>
                <div>
                    <TotalCountsBelowTable isBoxBalance={isBoxBalance} userInputs={userInputs} onChange={onChange} TotalCountsBelowArr={totCountBelArr}/>
                </div>
                <div>
                    <BillDetailsInput userInputs={userInputs} onChange={onChange} BillInputsArray={billInputs}/>
                </div>
            </div>
            </div>
            {
                isSaveButton ?
                 <div style={{display:"flex",justifyContent:"end"}}>
                    <button type='submit' className='save-btn-transaction'>Save</button>
                 </div>
                 :
                 <div style={{display:"flex",justifyContent:"space-between"}}>
                <button className='copy-table-btn' type='button' onClick={copyTableFun}>Copy This table</button>
                <SubmitButton/>
                 </div>
            }
        </div>
        </form>
        <div style={{marginTop:"20px"}}>
            <BelowTableButtonIndex/>
        </div>
    </div>
  )
}

export default TransactionTablesWithEntry