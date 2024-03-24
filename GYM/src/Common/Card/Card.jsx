import React from "react";
import "./Card.css";
import CommonPara from "../Para/Para";
const Card = ({logo,info,count,onclick}) => {
  return (
    <div onClick={onclick} className="dashboard-item">
      <div className="icon">{logo}</div>
      <div className="info">
        <h3>{info}</h3>
        <CommonPara label={count} />
      </div>
    </div>
  );
};
export default Card;
