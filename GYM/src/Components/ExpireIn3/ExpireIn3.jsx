import React, { useState } from 'react'
import CommonPara from '../../Common/Para/Para'
import Table from '../../Common/Table/Table'
import { data } from '../../Data/Data'
import './ExpireIn3.css'
import Renewelpop from '../Renewelpop/Renewelpop'
const ExpireIn3 = ({HandleRenewel}) => {
  const columns=[
    {Header:'S_No',Datakey:'S_no'},
    {Header:'Profile',Datakey:'profile'},
    {Header:'Name',Datakey:'Name'},
    {Header:'Phone No',Datakey:'PhoneNo'},
    {Header:'Join Date',Datakey:'JoinDate'},
    {Header:'Expire Within',Datakey:'ExpireWithIn'},
    {Header:'ExpiredDate',Datakey:'ExpiredDate'},
    {Header:'Renewal',Datakey:'Renewal'},
]
const Renewel =()=>{
  HandleRenewel()
}
  return (
    <div className='RRContainer'>
       <div className='RRTitle'>
         <CommonPara  label='Accounts are going to expired with in 3 days'/>
         </div>
        <Table HandelRenewel={Renewel} maxHeight='46vh' data={data} columns={columns} />
    </div>
  )
}

export default ExpireIn3