import React from "react";
import Label from "../Label/Label";
import Paragraph from "../Paragraph/Paragraph";
import Textbox from "../Textbox/Textbox";
import { MenuItem, Select } from "@mui/material";
import "./FormCardStyle.css";
import RadioButton from "../RadioButton/RadioButton";

const FormTextBox = ({ Value, type, labelClassName, inpStyle, options, onChange, selectValue, name, inpValue, required, checked, onClick , disable }) => {

  return (
    <div onClick={onClick}>
      <div className="FormTextBox-Main-division">
        <div className="FormTextBox-Name-division">
          <Label className={labelClassName} value={Value} for={name} /> 
          <Paragraph value=":" className="FormTextBox-semicolon" />
        </div>
        <div className="FormTextBox-Textbox-division" style={{ width: "100%" }}>
          {type === "select" ? (
            <Select
              id={name} 
              sx={{
                width: "100%",
                border: "0px solid white",
                backgroundColor: "white",
                boxShadow: "0px 0px 4px rgb(214, 214, 214)",
                height: "40px",
              }}
              value={selectValue}
              onChange={onChange}
            >
              {options.map((val, i) => (
                <MenuItem key={i} value={val}>
                  {val}
                </MenuItem>
              ))}
            </Select>
          ) : type === "checkbox" ? (
            <input id={name} value={inpValue} onChange={onChange} checked={checked} name={name} style={{ width: "25px", height: "25px" }} type="checkbox" />
          ) : type === "radio" ? (
            <RadioButton value={inpValue} />
          ) : (
            <Textbox
              id={name} 
              name={name}
              onchange={onChange}
              type={type}
              style={{ ...inpStyle, width: "100%" }}
              className="FormTextBox-Textbox"
              value={inpValue}
              required={required}
              disable={disable}
            />
          )}
        </div>
      </div>
      <br />
    </div>
  );
};

export default FormTextBox;
