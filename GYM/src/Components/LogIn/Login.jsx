import React, { useState } from "react";
import "./Login.css";
import CommonPara from "../../Common/Para/Para";
import CommonInput from "../../Common/Input/Input";
import CommonButton from "../../Common/Button/Button";
import { MdEmail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { Path } from "../../Common/Router/Router";
import { useNavigate } from "react-router-dom";


const LoginComponent = ({handleForget}) => {
  const Navigate=useNavigate()
  return (
    <div className="LoginInner">
    <div className="LoginCon">
      <div className="LoginHead">
        <div className="BlackProfile"></div>
        <div className="Head">
          <CommonPara label="Beast Forces Gym" />
        </div>
      </div>
      <p className="LoginName">
        <u>Lo</u>gin
      </p>
      <div className="LoginContents">
        <div className="LoginInput">
          <div className="emailLogo">
            <MdEmail />
          </div>
          <CommonInput type="email" placeholder="Email" className="inp" />
          <div className="LockLogo">
            <IoIosLock />
          </div>
          <CommonInput
            type="password"
            placeholder="Password"
            className="inp"
          />
        </div>
        <CommonPara onClick={() => handleForget()} className="ForgetPass" label="forget password?" />
      </div>
      <div className="LoginBtn">
        <CommonButton onClick={() => Navigate(Path.Home)} className="LobinButton" label="Login" />
      </div>
    </div>
  </div>
  );
};

export default LoginComponent;
