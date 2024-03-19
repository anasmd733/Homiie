import React, { useEffect, useState } from 'react'
import SearchBar from '../../../Common/SearchBar/SearchBar'
import OptionButton from '../../../Common/OptionButton/OptionButton'
import { RiMenuFoldLine } from 'react-icons/ri'
import BlueButton from '../../../Common/Submit/BlueButton'
import FilterButton from '../../../Common/FilterButton/FilterButton'
import { FaPrint } from 'react-icons/fa'
import Table1 from '../../../Common/Table/Table'
import { BoxBalanceArray } from './BoxBalanceArray'
import { GoArrowLeft } from "react-icons/go"
import BelowTableButtonIndex from '../../../Common/BelowTableButton/BelowTableButtonIndex'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { EndPoint } from '../../../EndPoints/EndPoint'
import ReportsHeadSearchComp from '../ReportsHeadSearchComp'
import { SearchFuntion } from '../../../Common/SearchBar/SearchFuction'

const BoxBalanceComponent = () => {
    const [originalData, setOriginalData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)
    const Navigate = useNavigate()

    useEffect(()=>{
        const openFun = async ()=>{
            const res = await axios.get(`${EndPoint}/boxDetails`)
            const temArr = []
            res.data.forEach((val)=>{
                const {id, "Customer Name" : CustomerName, Balance, Date}   = val
                temArr.push(
                    {
                        "id":id,
                        "Customer Name" : CustomerName,
                        "Box Balance" : Balance,
                        "Date" : Date
                    }
                )
            })
            setOriginalData(temArr)
            setFilteredData(temArr)
            setLoaded(true)
        }
        openFun()
    },[])
  return (
    <div>
        {
            loaded ? 
            <div>
            <div style={{padding:"10px 0px 20px 0px",color:"#333A44",fontSize:"16px",fontWeight:"bold"}}>{"Reports"} <b>{">"}</b> {"Box Balance"} </div>
                <div style={{backgroundColor:"white",padding:"10px"}}>
                <ReportsHeadSearchComp
                 originalData={originalData}
                 setFilteredData={setFilteredData}
                 onChange={(e)=>SearchFuntion(e,originalData,setFilteredData)}  
                />



                {/* <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                }}
                >
                <div
                    style={{
                    display: "flex",
                    alignItems: "center",
                    width: "60%",
                    gap: "10px",
                    }}
                >
                    <SearchBar style={{ flex: 1, borderRadius : "4px" }} />
                    <OptionButton iscricrle={true} icon={<RiMenuFoldLine />} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    <BlueButton
                    value={"Export to Excel"}
                    className="ExpenseTableHead-BlueButton"
                    />
                    <OptionButton
                    iscricrle={false}
                    icon={<FaPrint fontSize={"20px"} />}
                    />
                    <FilterButton />
                </div>
                </div> */}
                <div style={{marginTop:"20px"}}>
                    <Table1 tableDatas={filteredData}/>
                </div>
                <div style={{display:"flex",justifyContent:"end",cursor:"pointer",color:"blue"}} onClick={()=>Navigate(-1)}>
                    <div style={{marginRight:"5px"}}>
                        <GoArrowLeft/>
                    </div>
                    <p>Back</p>
                </div>
                </div>
                <div style={{marginTop:"20px"}}>
                    <BelowTableButtonIndex/>
                </div>
            </div> 
            : 
            <h1>Loading</h1>
        }
    </div>
  )
}

export default BoxBalanceComponent