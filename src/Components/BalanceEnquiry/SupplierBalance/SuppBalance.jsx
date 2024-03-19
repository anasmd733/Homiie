import React, { useEffect, useState } from 'react'
import TableWithAdd from '../../../Common/TableWithAdd/TableWithAdd'
import NavButton from '../../../Common/NavButton/NavButton'
import BelowTableButtonIndex from '../../../Common/BelowTableButton/BelowTableButtonIndex'
import { SupplierBalanceArr } from './SupplierBalanceArr'
import ReportsHeadSearchComp from '../../ReportsComponent/ReportsHeadSearchComp'
import { SearchFuntion } from '../../../Common/SearchBar/SearchFuction'
import axios from 'axios'
import { EndPoint } from '../../../EndPoints/EndPoint'

const SuppBalance = () => {
  const [wholeData, setWholeData] = useState([])
  const [filtered, setFilered] = useState([])
  const [data1, setData1] = useState([])
  const [data2, setData2] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(()=>{
    const openFun = async ()=>{
      setLoaded(false)
      try{
        const res = await axios.get(`${EndPoint}/purchaseDetails`)
        // console.log(res.data);
        // setData(res.data);
        const filteredKeys = res.data.map(({ SupplierName, NetBalance, id }) => ({
          id,
          SupplierName,
          BalanceAmount: NetBalance,
        }));
        setWholeData(filteredKeys);
        // console.log(filteredKeys);
        setData1(prevData => filteredKeys.filter((val, i) => i % 2 === 0 ));
        setData2(prevData => filteredKeys.filter((val, i) => i % 2 !== 0 ));
        setError(false)
      } catch(err){
        console.error(err);
        setError(true)
      }
      setLoaded(true)
    }
    openFun()
  },[])

  const searchFun = (e) => {
    const searchArr = SearchFuntion(e, wholeData, setFilered);
    setData1(prevData => searchArr.filter((val, i) => i % 2 === 0 ));
    setData2(prevData => searchArr.filter((val, i) => i % 2 !== 0 ));
  };

  return (
    <div>
      {
        loaded && !error ? 
        <div>
          <div style={{backgroundColor:"white",padding:"10px",marginBottom:"20px"}}>
            <ReportsHeadSearchComp onChange={searchFun}/>
            <div style={{display:"flex",gap:"50px",overflowX:"auto"}}>
                <TableWithAdd style={{flex:"1"}} TableWithAddArr={data1}/>
                {
                  data2.length>0 && <TableWithAdd style={{flex:"1"}} TableWithAddArr={data2}/>
                }
            </div>
            <div style={{display:"flex",justifyContent:"end"}}>
              <NavButton value={"View Full Details"} paraStyle={{fontSize:"12px"}}/>
            </div>
          </div>
          <BelowTableButtonIndex/>
        </div> : !loaded ? <h1>Loading</h1> : <h1>An Error Occurred</h1>
      }
    </div>
  )
}

export default SuppBalance