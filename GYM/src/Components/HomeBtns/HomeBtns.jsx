import React, { useState } from 'react'
import CommonButton from "../../Common/Button/Button";
import './HomeBtns.css'
import { FaUserPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Path } from '../../Common/Router/Router';
const HomeBtns = ({ExpiredAc,HadleExpireTable,HandleEx3}) => {
  const Navigate=useNavigate()
  const[btn,setbtn]=useState(false)
  return (
        <div className="HomeButtons">
        <div className="HomeBtnCon">
        <CommonButton onClick={()=>Navigate(Path.Register)} className='Homeregister'  label={<FaUserPlus/>} label2='New Register' />
        </div>
        <div className="HomeBtnCon2">
        <CommonButton onClick={()=>{setbtn(false);HandleEx3()}} className={btn?'Home3days':'Home3'} label2='Accounts are going to expired with in 3 days' />
        <CommonButton onClick={()=>{setbtn(true);HadleExpireTable()}}  className={!btn?'HomeEx':'HomeExChange'}  label='Account Expired' />
        </div>
      </div>
  )
}

export default HomeBtns