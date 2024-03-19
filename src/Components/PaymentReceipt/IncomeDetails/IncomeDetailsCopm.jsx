import React, { useEffect, useState } from 'react'
import Table1 from '../../../Common/Table/Table'
import BlueButton from '../../../Common/Submit/BlueButton'
import ReportsHeadSearchComp from '../../ReportsComponent/ReportsHeadSearchComp'
import axios from 'axios'
import { SearchFuntion } from '../../../Common/SearchBar/SearchFuction'
import { EndPoint } from '../../../EndPoints/EndPoint'

const IncomeDetailsCopm = () => {

  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error,seterror]=useState(false);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${EndPoint}/salesDetails`);
      const filteredData = response.data.map(item => ({
        BillNo: item.BillNo,
        CustomerName: item.CustomerName,
        Date: item.Date,
        TotalAmount: item.BillAmount, 
        CashReceived: item.CashRecieved 
      }));
      setOriginalData(filteredData);
      setFilteredData(filteredData);
      setLoaded(true);
    } catch (error) {
      console.error("Error fetching notes data:", error);
      seterror("Error fetching notes data...")
    }
  };
    useEffect(() => {
      fetchData();
  }, []);

  useEffect(()=>{
    
    let totalExpenseAmount = 0;
    filteredData.forEach(item => {
    totalExpenseAmount += parseInt(item.CashReceived);
    setTotalExpenseAmount(totalExpenseAmount);
});

  },[filteredData])


  return (
    <div>
          {
      loaded ?
      <div className='PaymentReceipt-Main-division'>
      <ReportsHeadSearchComp
       onChange={(e)=>SearchFuntion(e,originalData,setFilteredData)}
       originalData={originalData}
       setFilteredData={setFilteredData}/>
  
      <div className='PaymentReceipt-Table-Division'>
      <Table1 
       tableDatas={filteredData}/>
     
      <BlueButton value={`Total Cash Received = ${totalExpenseAmount} `} className='PaymentReceipt-BlueButton'/>
      </div>
  
      </div>:
      error ?
      <h1>{error}</h1>
      :
      <h1>Loading...</h1>
      }
    </div>
  )
}

export default IncomeDetailsCopm