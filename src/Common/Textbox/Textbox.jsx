import React from "react";
import "./Textbox.css";


const Textbox = ({type,className,name,id,onchange,style, value, required,disable}) => {
  const currentDate = new Date();
  const date = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const handleInputChange = (event) => {
    if (type === "number") {
      const inputValue = event.target.value;
      const regex = /^[0-9]{1,12}$/;
      if (!regex.test(inputValue)) {
        event.preventDefault();
      }
    }
    onchange(event);
  };

  return (
    <div>
      {type == "textarea" ? (
        <textarea
          value={value}
          name={name}
          id={name}
          cols="30"
          rows="10"
          style={{ width: "100%" }}
          className={`Text-Area-InpBox ${className}`}
          onChange={onchange}
          required={required}
          disabled={disable}
        ></textarea>
      ) : (
        <input
          type={type}
          className={
            type === "date"
              ? `Date-box ${className}`
              : `Textbox-inputbox ${className}`
          }
          value={value}
          name={name}
          id={id}
          onChange={handleInputChange}
          required={required}
          disabled={disable} 
          style={{ ...style, padding: "0px 10px" }}
        />
      )}
    </div>
  );
};

Textbox.defaultProps = {
  type: "text",
  className: "",
  name: "",
  id: "",
  defaultValue: "",
};

export default Textbox;
