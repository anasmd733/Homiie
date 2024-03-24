import React from "react";
import CommonPara from "../Para/Para";
import "./Navbar.css";
import {useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate=useNavigate()
 
  return (
    <nav>
      <div className="navlinks">
      <div className="NavId">
        <div className="BkCircle"></div>
        <CommonPara label="Beast Forces" />
      </div>
      </div>
    </nav>
  );
}
