import React from 'react'
import CommonPara from '../../Common/Para/Para'
import Table from '../../Common/Table/Table'
import { exdata } from '../../Data/Data'
import './ExpiredAc.css'
const ExpireIn3 = ({Handelrenewel}) => {
    const columns=[
        {Header:'S_No',Datakey:'S_no'},
        {Header:'Profile',Datakey:'profile'},
        {Header:'Name',Datakey:'Name'},
        {Header:'Phone No',Datakey:'PhoneNo'},
        {Header:'Join Date',Datakey:'JoinDate'},
        {Header:'ExpiredDate',Datakey:'ExpiredDate'},
        {Header:'Renewal',Datakey:'Renewal'},
    ]
    const Renewel =()=>{
      Handelrenewel()
    }
  return (
    <div className='RRContainer'>
       <div className='RRTitle'> <CommonPara  label='Expired Account'/></div>
        <Table HandelRenewel={Renewel} maxHeight='46vh' data={exdata} columns={columns} />
    </div>
  )
}

export default ExpireIn3