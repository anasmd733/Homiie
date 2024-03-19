import React, { useEffect, useState } from "react";
import DashBoardCardsParent from "../../Common/Dashboard/DashBoardCardsParent/DashboardParent";
import "./style.css";
import NavButton from "../../Common/NavButton/NavButton";
import Table1 from "../../Common/Table/Table";
import DashBoardContentIndex from "../../Common/Dashboard/DashBoardContentCardParent/Index/DashBoardContentIndex";
import { SalesReportsArray } from "./SalesReportsArray";
import axios from "axios";
import { EndPoint } from "../../EndPoints/EndPoint";

const DashBoardComponent = () => {
  const [salesReport, setSalesReport] = useState([])
  const [purchaseReport, setPurchaseReport] = useState([])
  const [totalCustomer, setTotalCustomer] = useState(0)
  const [totalSupplier, setTotalSupplier] = useState(0)
  const [totalSalesAmount, setTotalSalesAmount] = useState(0)
  const [totalPurchaseAmount, setTotalPurchaseAmount] = useState(0)
  const [boxBalance, setBoxBalance] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  useEffect(()=>{
    const openFun = async()=>{
      try{
        const customerData = await axios.get(`${EndPoint}/ledgerCustomer`);
        setTotalCustomer(customerData.data.length)

        const supplierData = await axios.get(`${EndPoint}/ledgerSupplier`);
        setTotalSupplier(supplierData.data.length)

        const salesDetails = await axios.get(`${EndPoint}/salesDetails`);
        let salesAmount = 0;
        salesDetails.data.forEach((val)=> salesAmount+=Number(val.BillAmount))
        setTotalSalesAmount(salesAmount);
        // console.log(salesDetails.data);
        setSalesReport(prev=>salesDetails.data.flatMap((item) => item.productDetails || []))

        // console.log(salesDetails.data.flatMap((item) => item.productDetails || []));

        const purchaseDetails = await axios.get(`${EndPoint}/purchaseDetails`)
        let purchaseAmount = 0;
        purchaseDetails.data.forEach((val)=> purchaseAmount+=Number(val.BillAmount))
        setTotalPurchaseAmount(purchaseAmount);
        setPurchaseReport(purchaseDetails.data.flatMap((item)=> item.productDetails || []))

        const boxDetails = await axios.get(`${EndPoint}/productRegister`)
        setBoxBalance(boxDetails.data.length)
        setError(false)
      } catch(err){
        console.error(err);
        setError(true)
      }
      setLoaded(true)
    }
    openFun()
  },[])
  return (
    <div>
      {
        loaded && !error ?
        <div>
        <DashBoardCardsParent boxBalance={boxBalance} totalPurchaseAmount={totalPurchaseAmount} totalSalesAmount={totalSalesAmount} totalSupplier={totalSupplier} totalCustomer={totalCustomer} />
          <div className="dashboard-reports-balance">
            <div className="dashboard-reports">
              <div className="dash-reports-card">
                <div className="nav-div-dash">
                  <NavButton
                    value={"Sales Report"}
                    paraStyle={{
                      color: "#333A44",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  />
                </div>
                {/* <div> */}
                  <Table1 tableDatas={SalesReportsArray} />
                {/* </div> */}
              </div>
              <div className="dash-reports-card">
                <div className="nav-div-dash">
                  <NavButton
                    value={"Purchase Report"}
                    paraStyle={{
                      color: "#333A44",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  />
                </div>
                {/* <div> */}
                  <Table1 tableDatas={SalesReportsArray} />
                {/* </div> */}
              </div>
            </div>
            <div className="dashboard-balance">
              <div className="dash-balance-card">
                <DashBoardContentIndex />
              </div>
              <div className="dash-balance-card">
                <DashBoardContentIndex navigationValue={"Payment Receipt"} />
              </div>
              <div className="dash-balance-card">
                <DashBoardContentIndex navigationValue={"Product Details"} />
              </div>
            </div>
          </div>
      </div> : !loaded ? <h1>Loading</h1> : <h1>Error Occurred</h1>
      }
    </div>
  );
};

export default DashBoardComponent;