import React, { useState } from "react";
import "./style.css";
// import {TopTableIcons,TransactioInputNotIcArr,} from "./TransactioInputArrIcons";
import OptionButton from "../../OptionButton/OptionButton";
import FormTextBox from "../../FormCard/FormTextBox";
import { PrintFunction } from "../../PrintFunction.js/PrintFunction";
const TransactionInputsWithIcons = ({TopTableIcons,TransactioInputNotIcArr,isBillButton,onChange,userInputs,modeOnClick, currentClick, copyWholeInput, pasteWholeInput,setCurrentClick}) => {
  // const [currentClick, setCurrentClick] = useState("")
  return (
    <div>
      {TransactioInputNotIcArr && TransactioInputNotIcArr.length > 0
        ? TransactioInputNotIcArr.map((val, i) => (
            <FormTextBox required={val.title == "Bill No" ? true : false} inpValue={userInputs[val.name]} onChange={onChange} name={val.name} key={i} Value={val.title} type={val.type} />
          ))
        : ""}
      <div
        className="transaction-with-icons"
      >
        {isBillButton && (
          <>
            <button className={currentClick == "Credit" ? "credit-bill-button" : "cash-bill-button" } type="button" onClick={()=>{
              modeOnClick("Credit")
              setCurrentClick("Credit")
              }}>Credit Bill</button>
            <button className={currentClick == "Cash" ? "credit-bill-button" : "cash-bill-button" } type="button" onClick={()=>{
              modeOnClick("Cash")
              setCurrentClick("Cash")
              }}>Cash Bill</button>
          </>
        )}
        <div className="trans-option-btn">
          {TopTableIcons && TopTableIcons.length > 0
            ? TopTableIcons.map((val, i) => (
                <OptionButton
                  key={i}
                  onClick={() => (val.name == "print" ? PrintFunction("transaction") : val.name== "copy" ? copyWholeInput() : val.name == "paste" ? pasteWholeInput() : ()=>{})}
                  icon={<val.icon />}
                  iscricrle={val.isRounded}
                />
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default TransactionInputsWithIcons;
