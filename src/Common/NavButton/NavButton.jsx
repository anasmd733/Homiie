import React from "react";
import Paragraph from "../Paragraph/Paragraph";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { Path } from "../../Routes/Path";

const NavButton = ({ paraStyle, divStyle, value, path,className }) => {
  const Navigate = useNavigate()
  return (
    <div className="navigate-btn" style={divStyle} onClick={()=>Navigate(path)}>
      <Paragraph value={value} style={paraStyle} className={className} />
      <ArrowRightAlt className="navigation-icon"/>
    </div>
  );
};

NavButton.defaultProps = {
  value : '',
  path : Path.dashboard  
}

export default NavButton;