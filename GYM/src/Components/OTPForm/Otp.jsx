import React, { useState } from 'react'
import './Otp.css'
import CommonPara from '../../Common/Para/Para'
import CommonButton from '../../Common/Button/Button'
import CommonInput from '../../Common/Input/Input'
import Forget from '../Forgetform/Forget'
import Forgetpass from '../ForgetPass/Forgetpass'

const Otpform = () => {
    const [forgetpass,setforgetpass] = useState(false)
  return (
    <div className="OtpContainer">
        {forgetpass && <Forgetpass/>}
        {!forgetpass && <div className="OtpInner">
            <div className="OtpCon">
                <div className="OtpHead">
                    <div className="Blackdp"></div>
                    <div className="Head">
                    <CommonPara label="Beast Forces Gym" />
                </div>
            </div>
            <div className="OtpConn">
                <div className="OtpFrgt">
                <CommonPara label="Enter Your OTP" className="Otppass"/> 
                </div>
            </div>
            <div className="Otpinput">
                <CommonInput className="Otpipt"/>
                <CommonInput className="Otpipt"/>
                <CommonInput className="Otpipt"/>
                <CommonInput className="Otpipt"/>
            </div>
            <div className="OtpBtn">
            <CommonButton onClick={() => setforgetpass(true)} className="OtpButton" label="Send" />
            </div>
            <div className="ResendOtp">
                <CommonPara label="Resend the OTP" className="ResendPara"/>
            </div>
        </div>     
        </div>}
    </div>
  )
}

export default Otpform