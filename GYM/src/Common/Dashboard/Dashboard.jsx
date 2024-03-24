import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";
import { FaCoins } from "react-icons/fa6";
import { MdProductionQuantityLimits, MdLocalShipping } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { BiSolidLogOutCircle } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";
import CommonButton from "../Button/Button";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { Path } from "../Router/Router";

const buttonsData = [
  { label2: "Dashboard", icon: <BiSolidDashboard />, navi: Path.Home },
  { label2: "View Registered",icon: <FaUsers/>,navi: Path.ViewRegister,},
  { label2: "Payment History",icon:<FaCoins/> ,navi: Path.product,},
];

export default function CommonDashboard() {
  const Navigate = useNavigate();
  const [isDashboardVisible, setIsDashboardVisible] = useState(true);
  const [dash,setdash]=useState(false)

  const Handle = (index) => {
    if (index) {
      Navigate(index);
    }
  };

  const toggleDashboard = () => {
    setIsDashboardVisible(!isDashboardVisible);
  };

  function Dashboard() {
    setdash(true)
  }

  return (
    <>
      <div className="bg">
        <CommonButton
          onClick={toggleDashboard}
          className="toggle-button"
          label={<FaBars />}
        />
      </div>
      <div  className={isDashboardVisible ? "dashboard" : "dashboard-show"}>
        <div className="dashboardContent">
          <div className="topContainer">
            {buttonsData.map((button, index) => (
              <CommonButton
                onClick={() => {
                  Handle(button.navi);
                  Dashboard()
                }}
                key={index}
                className="btn"
                label2={button.label2}
                label={button.icon}
                logo="logo-style"
              />
            ))}
          </div>
        </div>
        <div className="bottomContainer">
          <CommonButton
            className="btn"
            label2="Logout"
            label={<BiSolidLogOutCircle />}
            logo="logo-style"
            onClick={()=>Navigate(Path.LogIn)}
          />
        </div>
      </div>
    </>
  );
}
