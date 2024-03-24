import React, { useState } from "react";
import "./Login.css";
import CommonPara from "../../Common/Para/Para";
import CommonInput from "../../Common/Input/Input";
import CommonButton from "../../Common/Button/Button";
import { MdEmail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { Contx } from "../../App";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom/dist";
import { Path } from "../../Common/Router/Router";
import Forget from "../../Components/Forgetform/Forget";
import LoginComponent from "../../Components/LogIn/Login";


const Login = () => {
  const { setLoginPage } = useContext(Contx);
  const Naviagte = useNavigate();
  const [forget, setForget] = useState(false)
  useEffect(() => {
    setLoginPage(true);
  }, []);
  const Handleforget=(e)=>{
    setForget(true)
    e.prevert.Default
  }
  return (

    <div className="LoginContainer">
    {forget && <Forget />}
      {!forget && <LoginComponent handleForget={Handleforget}/>}
    </div>
  );
};

export default Login;
