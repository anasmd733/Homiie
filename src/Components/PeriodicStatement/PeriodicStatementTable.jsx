import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { PeriodicStatementDetails } from './PeriodicStateDetails';
import Table1 from '../../Common/Table/Table';
import BelowTableButtonIndex from '../../Common/BelowTableButton/BelowTableButtonIndex'
import "./PeriodicStatementStyle.css"
import BlueButton from '../../Common/Submit/BlueButton'
import ReportsHeadSearchComp from '../ReportsComponent/ReportsHeadSearchComp'
import MyContext from '../../Common/MyContext/MyContext'
import { EndPoint } from '../../EndPoints/EndPoint';

const PeriodicStatementTable = () => {
  const { PeriodicStatementvalue } = useContext(MyContext);
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (PeriodicStatementvalue && PeriodicStatementvalue.ledgerType === "Customer Name") {
          response = await axios.get(`${EndPoint}/salesDetails`);
          const data = response.data
            .filter(item => item.CustomerName === PeriodicStatementvalue.Name&&
              item.Date>=PeriodicStatementvalue.FromDate && 
              item.Date<=PeriodicStatementvalue.ToDate) 
            .map((item, index) => ({
              SNO: index + 1,
              Date: item.Date,
              BillNo: item.BillNo,
              BillAmount: item.BillAmount,
              CashReceived: item.CashRecieved
            }));
          setOriginalData(data);
          setFilteredData(data);
        } 
        else {
          response = await axios.get(`${EndPoint}/purchaseDetails`);
          const data = response.data
            .filter(item => item.SupplierName === PeriodicStatementvalue.Name  &&
              item.Date>=PeriodicStatementvalue.FromDate && 
              item.Date<=PeriodicStatementvalue.ToDate) 
            .map((item, index) => ({
              SNO: index + 1,
              Date: item.Date,
              BillNo: item.BillNo,
              BillAmount: item.BillAmount,
              CashReceived: item.CashRecieved
            }));
          setOriginalData(data);
          setFilteredData(data);
        }
      } 
      catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [PeriodicStatementvalue]);
  
  return (
    <div>
      <div className='PeriodicStatementTable-Table-division'>
        <ReportsHeadSearchComp />
        {
          filteredData !== "" ? <Table1 tableDatas={filteredData} /> : null
        }

        <div className='PeriodicStatementTable-BlueButton-div'>
          <BlueButton value={"Copy This Table"} className='PeriodicStatementTable-BlueButton' />
        </div>
      </div>
      <div className='PeriodicStatementTable-BelowTableButtonIndex-div'>
        <BelowTableButtonIndex />
      </div>
    </div>
  );
}

export default PeriodicStatementTable;
