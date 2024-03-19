import React from "react";
import NavButton from "../../../NavButton/NavButton";
import "./style.css";
import { dashContentArr } from "./dashBoardContentArray";
import DashBoardContentCard from "../DashBoardContentCard/DashBoardContentCard.jsx";
import { Colors } from "../../../../Colors/Colors.js";
import { Path } from "../../../../Routes/Path.js";

const DashBoardContentIndex = ({navigationValue, path}) => {
  return (
    <div className="dash-cont-card-par">
      <NavButton
        path={path}
        value={navigationValue}
        paraStyle={{ fontSize: "16px", color: Colors.darkblue , fontWeight:'bold' }}
      />
      <div className="dash-content-div">
        { dashContentArr && dashContentArr.length > 0 ?
         dashContentArr.map((val, i) => (
          <DashBoardContentCard key={i} title={val.title} value={val.price} />
        )) : 'No Contents To Display'
      }
      </div>
    </div>
  );
};

DashBoardContentIndex.defaultProps = {
  navigationValue : 'Dashboard',
  path : Path.dashboard,
}

export default DashBoardContentIndex;
