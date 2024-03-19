import React, { useEffect, useState } from 'react'
import ReportsHeadSearchComp from '../../ReportsHeadSearchComp'
import DropDownComp from '../../../../Common/DropDown/DropDown'
import Table1 from '../../../../Common/Table/Table'
import { CustomerReportsArray } from '../CustomerReportsArray'
import BelowTableButtonIndex from '../../../../Common/BelowTableButton/BelowTableButtonIndex'

const CustomerSalesReports = ({unFormatedData}) => {
  const [formattedOutput, setFormattedOutput] = useState([]);
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(()=>{
    const openFun = async () => {
      const newFormattedOutput = [];
      unFormatedData.forEach((entry,i) => {
        const { id, SalesId, Date, CustomerName, CustomerId, BillAmount, Mode } = entry;
          newFormattedOutput.push({
            id,
            "Date" : Date,
            "Sales Id": SalesId,
            "Mode": Mode,
            "Customer Name": CustomerName,
            "Customer Id": CustomerId,
            "Bill Amount" : BillAmount
          });
        });
      setFormattedOutput(newFormattedOutput);
      setLoaded(true);
    };
    openFun()
},[])

  return (
    <div>
      {
        loaded ? 
        <div>
          <div
            style={{
              backgroundColor: "white",
              padding: "10px",
              marginTop: "10px",
              boxShadow: "0px 0px 5px rgb(183, 183, 183)",
            }}
          >
            <ReportsHeadSearchComp/>
            <div style={{ margin: "20px 0px" }}>
              <DropDownComp
                DropDownValuesArr={[
                  "Customer Name",
                  "Customer Name",
                  "Customer Name",
                  "Customer Name",
                  "Customer Name",
                ]}
              />
            </div>
            <div>
              <Table1 tableDatas={formattedOutput} />
            </div>
          </div>
          <div style={{ marginTop: "15px" }}>
            <BelowTableButtonIndex />
          </div>
        </div> : <h1>Loading</h1>
      }
    </div>
  )
}

export default CustomerSalesReports