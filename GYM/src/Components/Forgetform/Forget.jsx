import React, { useState } from 'react'
import './Forget.css'
import { MdEmail } from "react-icons/md";
import CommonInput from '../../Common/Input/Input';
import CommonPara from '../../Common/Para/Para';
import CommonButton from '../../Common/Button/Button';
import Otpform from '../OTPForm/Otp';

const Forget = () => {
    const [Otp,setOtp] = useState(false)
  return (
    <div className="ForgetContainer">
    {Otp && <Otpform/>}
    {!Otp && <div className="ForgetInner">
        <div className="ForgetCon">
        <div className="ForgetHead">
            <div className="Blackdp"></div>
            <div className="Head">
              <CommonPara label="Beast Forces Gym" />
            </div>
        </div>
        <div className="ForgetConn">
        <div className="Forget">
            <CommonPara label="Forget Your Password?" className="Forgetpass"/> 
            <CommonPara label="Enter your Email below to receive your OTP" className="forget-otp"/>
        </div>
        </div>
        <div className="ForgetInput">
            <div className="EmailLogo">
                <MdEmail />
            </div>
            <CommonInput type="email" placeholder="Email" className="inp" />
        </div>
        <div className="ForgetBtn">
            <CommonButton onClick={() => setOtp(true)} className="ForgetButton" label="Send" />
        </div>
        </div>
    </div>}
    </div>
  )
}

export default Forget