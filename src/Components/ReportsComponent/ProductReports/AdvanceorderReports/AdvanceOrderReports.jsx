import React, { useEffect, useState } from 'react'
import { AdvanceOrderReportsArr } from './AdvanceOrderArray'
import ReportsHeadSearchComp from '../../ReportsHeadSearchComp'
import DropDownComp from '../../../../Common/DropDown/DropDown'
import Table1 from '../../../../Common/Table/Table'
import BelowTableButtonIndex from '../../../../Common/BelowTableButton/BelowTableButtonIndex'
import axios from 'axios'
import { EndPoint } from '../../../../EndPoints/EndPoint'

const AdvanceOrderReports = () => {
    const [formattedOutput, setFormattedOutput] = useState([]);
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)
    useEffect(()=>{
        const openFun = async()=>{
            try{
                const res = await axios.get(`${EndPoint}/advanceDetails`)
                res.data.forEach(({id, CustomerName, productDetails, Date})=>{
                    formattedOutput.push(
                        {"id" : id, "Customer Name" : CustomerName, "Total Items" : productDetails.length, "Date" : Date}
                    )
                    // setFormattedOutput(prev=>[...prev,{"id" : id, "CustomerName" : CustomerName, "productDetails" : productDetails.length, "Date" : Date}])
                })
                // console.log(formattedOutput);
                setError(false)
            } catch(err){
                setError(true)
                console.error(err);
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
                <div style={{backgroundColor:"white",padding:"10px",margin:"15px 0px"}}>
                <div>
                    <ReportsHeadSearchComp/>
                </div>
                <div>
                    <DropDownComp DropDownValuesArr={["Choose Product","Product 1","Product 1","Product 1","Product 1","Product 1","Product 1",]}/>
                </div>
                <div style={{margin:"10px 0px"}}>
                    <Table1 tableDatas={formattedOutput}/>
                </div>
                </div>
                <div>
                    <BelowTableButtonIndex/>
                </div>
            </div> : !loaded ? <h1>Loading</h1> : <h1>An Error Occurred</h1>
        }
    </div>
  )
}

export default AdvanceOrderReports