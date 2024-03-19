import React, { useEffect, useState } from "react";
// import { TransactionTopArr } from './TransactionTopArr'
import FormTextBox from "../../FormCard/FormTextBox";

const TransactionTopInputs = ({TransactionTopArr,onChange,userInputs,setUserInputs}) => {

  return (
    <div style={{ width: "40vw" }}>
      {TransactionTopArr && TransactionTopArr.length > 0
        ? TransactionTopArr.map((val, i) => (
            <FormTextBox
              required={val.required}
              name={val.name}
              inpValue={userInputs[val.name]}
              key={i}
              Value={val.title}
              type={val.type}
              onChange={onChange}
            />
          ))
        : ""}
    </div>
  );
};

export default TransactionTopInputs;