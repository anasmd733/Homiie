import React, { useState } from 'react'
import './ForgetPass.css'
import CommonPara from '../../Common/Para/Para'
import CommonButton from '../../Common/Button/Button'
import CommonInput from '../../Common/Input/Input'
import { MdEmail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import Login from '../../Page/LogIn/Login'

const Forgetpass = () => {
    const [login,setlogin]=useState(false)
return (
    <div style={{width:'100%'}}>
        {login && <Login/>}
        {!login && <div className="FrgtPassInner">
            <div className="FrgtPassCon">
                <div className="FrgtPassHead">
                    <div className="BlackProfile"></div>
                    <div className="Head">
                        <CommonPara label="Beast Forces Gym" />
                    </div>
                </div>
                <div className="ResertPass">
                <div className="ResertContent">
                    <CommonPara label="Resert Password" className="Forgetpass"/> 
                   <div className="redtext">
                   <CommonPara label="Enter your new password below,we are just being extra safe" className="NewpassLine"/>
                   </div>
                </div>
                </div>
                <div className="LoginContents">
                    <div className="LoginInput">
                    <div className="emailLogo"><MdEmail /></div>
                        <CommonInput type="email" placeholder="Email" className="inp" />
                    <div className="LockLogo"><IoIosLock /></div>
                        <CommonInput type="password" placeholder="Password" className="inp"/>
                    </div>
                </div>
                <div className="SaveBtn">
                    <CommonButton onClick={()=>setlogin(true)}  className="SaveButton" label="Save" />
                </div>
            </div>
        </div>}
    </div>
  )
}

export default Forgetpass