import React, { useEffect, useState } from "react";
import GreenHoverButton from "../../../Common/GreenHoverButton/GreenHoverButton";
import SearchBar from "../../../Common/SearchBar/SearchBar";
import OptionButton from "../../../Common/OptionButton/OptionButton";
import { RiMenuFoldLine } from "react-icons/ri";
import BlueButton from "../../../Common/Submit/BlueButton";
import FilterButton from "../../../Common/FilterButton/FilterButton";
import { FaPrint } from "react-icons/fa";
import DropDownComp from "../../../Common/DropDown/DropDown";
import Table1 from "../../../Common/Table/Table";
import { CustomerReportsArray } from "./CustomerReportsArray";
import BelowTableButtonIndex from "../../../Common/BelowTableButton/BelowTableButtonIndex";
import ReportsHeadSearchComp from "../ReportsHeadSearchComp";
import CustomerDetails from "./CustomerDetails/CustomerDetails";
import CustomerSalesReports from "./CustomerSalesReports/CustomerSalesReports";
import axios from "axios";
import { EndPoint } from "../../../EndPoints/EndPoint";

const CustomerReportsComponent = () => {
  const [selected, setSelected] = useState("details");
  const [dataFromApi, setDataFromApi] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(()=>{
    const openFun = async()=>{
        try{
            let res = await axios.get(`${EndPoint}/salesDetails`)
            setDataFromApi(res.data)
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
          <div style={{ display: "flex", gap: "20px" }}>
            <GreenHoverButton
              value={"Customer Details"}
              style={{ flex: "1",backgroundColor: selected == "details" ? "#68D183" : "white",
              color : selected == "details" ? "white" : "#333A44" }}
              onClick={() => setSelected("details")}
            />
            <GreenHoverButton
              value={"Customer Sales Report"}
              style={{ flex: "1",backgroundColor: selected == "sales" ? "#68D183" : "white",
              color : selected == "sales" ? "white" : "#333A44" }}
              onClick={() => setSelected("sales")}
            />
          </div>
          <div>
            {
              selected == "details" ? <CustomerDetails unFormatedData={dataFromApi}/> : <CustomerSalesReports unFormatedData={dataFromApi}/>
            }
          </div>
        </div> : !loaded ? <h1>Loading</h1> : <h1>Error</h1>
      }
    </div>
  );
};

export default CustomerReportsComponent;