import React, { useState, useEffect } from 'react';
import Table1 from '../../../Common/Table/Table';
import Paragraph from '../../../Common/Paragraph/Paragraph';
import './style.css';
import ReportsHeadSearchComp from '../../ReportsComponent/ReportsHeadSearchComp';
import axios from 'axios';
import { SearchFuntion } from '../../../Common/SearchBar/SearchFuction';
import { EndPoint } from '../../../EndPoints/EndPoint';

const ExpenseDetailsComp = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [VehicleExpenseData, setVehicleExpenseData] = useState([]);
  const [CommonExpenseData, setCommonExpenseData] = useState([]);
  const [totalSupplierAmount, settotalSupplierAmount] = useState(0);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);
  const [totalCommonExpenseAmount, setTotalCommonExpenseAmount] = useState(0);
  const [filterVehicleExpenseData, setfilterVehicleExpenseData] = useState([]);
  const [filterCommonExpenseData, setfilterCommonExpenseData] = useState([]);
  const [CurrentDate, setCurrentDate] = useState({
    from: "",
    to: ""
  });
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${EndPoint}/purchaseDetails`);
      const VehicleExpense = await axios.get(`${EndPoint}/VehicleExpense`);
      const CommonExpense = await axios.get(`${EndPoint}/CommanExpense`);
      
      const filteredData = response.data.map(item => ({
        BillNo: item.BillNo,
        SupplierName: item.SupplierName,
        Date: item.Date,
        TotalAmount: item.BillAmount,
        CashReceived: item.CashRecieved
      }));

      setVehicleExpenseData(VehicleExpense.data); 
      setCommonExpenseData(CommonExpense.data)
      setfilterVehicleExpenseData(VehicleExpense.data);
      setfilterCommonExpenseData(CommonExpense.data);
      setOriginalData(filteredData);
      setFilteredData(filteredData);
      setLoaded(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data...');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateDateState = (newDate) => {
    if(newDate.from !=="" && newDate.to !== ""){
      setCurrentDate(newDate);

      const Vehiclefiltered = VehicleExpenseData.filter(item => {
        return item.Date>=newDate.from && item.Date<=newDate.to
       });
      const Commonfiltered = CommonExpenseData.filter(item => {
        return item.Date>=newDate.from && item.Date<=newDate.to
       });
      
       setfilterVehicleExpenseData(Vehiclefiltered)
       setfilterCommonExpenseData(Commonfiltered)
    }
  };

  useEffect(()=>{
    setfilterVehicleExpenseData(VehicleExpenseData)
    setfilterCommonExpenseData(CommonExpenseData)
  },[filteredData])


  useEffect(() => {
    let totalSupplierAmount = 0;
    filteredData.forEach(item => {
      totalSupplierAmount += parseInt(item.TotalAmount); 
    });
    if (isNaN(totalSupplierAmount)) {
      totalSupplierAmount = 0;
    }
    settotalSupplierAmount(totalSupplierAmount);
  }, [filteredData]);

  useEffect(() => {
    let totalExpenseAmount = 0;
    filterVehicleExpenseData.forEach(item => {
      totalExpenseAmount += parseInt(item.Amount);
    });
    setTotalExpenseAmount(totalExpenseAmount);
  }, [filteredData]); 

  useEffect(() => {
    let totalCommonExpenseAmount = 0;
    filterCommonExpenseData.forEach(items => {
      totalCommonExpenseAmount += parseInt(items.ExpenseAmount);
    });
    setTotalCommonExpenseAmount(totalCommonExpenseAmount);
  }, [filteredData]); 
  
  return (
    <div>
      {loaded ? (
        <div className='PaymentReceipt-Main-division'>
          <ReportsHeadSearchComp
            onChange={e => SearchFuntion(e, originalData, setFilteredData)}
            originalData={originalData}
            setFilteredData={setFilteredData}
            updateDateState={updateDateState} 
          />
    
          <div className='PaymentReceipt-Table-Division'>
            <Table1 tableDatas={filteredData} />

            <div>
              <div className='totalNamesExpense'>
                <Paragraph value={'Total Supplier Expense'} />
                <Paragraph value={`=${totalSupplierAmount} `} />
              </div>
              <div className='totalNamesExpense'>
                <Paragraph value={'Total Vehicle Expense'} />
                <Paragraph value={`=${totalExpenseAmount}   `} />
              </div>
              <div className='totalNamesExpense'>
                <Paragraph value={'Total Common Expense'} />
                <Paragraph value={`= ${totalCommonExpenseAmount}`} />
              </div>
              <div className='totalNamesExpense' style={{ backgroundColor: '#487AE2', color: 'white' }}>
                <Paragraph value={'Total Expense'} />
                <Paragraph 
                value={`=${totalSupplierAmount+totalExpenseAmount+totalCommonExpenseAmount}`} />
              </div>
            </div>
          </div>
        </div>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default ExpenseDetailsComp;
