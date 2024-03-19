import React, { useEffect, useState } from 'react'
import ReportsHeadSearchComp from '../../ReportsHeadSearchComp'
import DropDownComp from '../../../../Common/DropDown/DropDown'
import Table1 from '../../../../Common/Table/Table'
import { SalesReportArr } from './SalesReportsArr'
import BelowTableButtonIndex from '../../../../Common/BelowTableButton/BelowTableButtonIndex'
import axios from 'axios'
import { EndPoint } from '../../../../EndPoints/EndPoint'

const SalesReportsComponent = () => {

    const [formattedOutput, setFormattedOutput] = useState([]);
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)

    useEffect(()=>{
        const openFun = async()=>{
            try{
                let res = await axios.get(`${EndPoint}/salesDetails`)
                // setData(res)
                res.data.forEach((entry) => {
                    const { Date, SalesId, CustomerName, productDetails } = entry;
                    productDetails.forEach((productDetail) => {
                      const { "Product Name": productName, Quantity: productQuantity, "Total Amount": Rate } = productDetail;
                      formattedOutput.push({
                        Sno: formattedOutput.length + 1,
                        Date,
                        SalesId,
                        CustomerName,
                        ProductName: productName,
                        ProductQuantity: productQuantity,
                        Rate,
                      });
                    });
                  });
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
                <div style={{backgroundColor:"white",padding:"10px",margin:"15px 0px"}}>
                <div>
                    <ReportsHeadSearchComp/>
                </div>
                <div>
                    <DropDownComp DropDownValuesArr={["Choose Product","Product 1","Product 1","Product 1","Product 1","Product 1","Product 1",]}/>
                </div>
                <div style={{margin:"10px 0px"}}>
                    <Table1 tableDatas={formattedOutput}/>
                </div>l
                </div>
                <div>
                    <BelowTableButtonIndex/>
                </div>
            </div> : !loaded ? <h1>Loading</h1> : <h1>Error Occurred</h1>
        }
    </div>
  )
}

export default SalesReportsComponent