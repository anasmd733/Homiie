import React, { useState } from "react";
import GreenHoverButton from "../../../Common/GreenHoverButton/GreenHoverButton";
import "./style.css";
import CustomerLedger from "./LedgerDetails/CustomerLedger";
import LedgerAccountComp from "./LedgerDetails/LedgerAccountComp";
import ProductRegisterComp from "./ProductRegister/ProductRegisterComp";

const MasterDetailsComponent = () => {
  const [greenSelect, setGreenSelect] = useState("ledger");
  const [wtSelect, setWtSelect] = useState("customer");
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <GreenHoverButton
          style={{
            width: "49%",
            backgroundColor: greenSelect == "ledger" ? "#68D183" : "white",
            color: greenSelect == "ledger" ? "white" : "#333A44",
          }}
          value={"Ledger Details"}
          onClick = {()=>setGreenSelect("ledger")}
        />
        <GreenHoverButton
          style={{
            width: "49%",
            backgroundColor: greenSelect == "product" ? "#68D183" : "white",
            color: greenSelect == "product" ? "white" : "#333A44",
          }}
          value={"Product Register Details"}
          onClick = {()=>setGreenSelect("product")}
        />
      </div>
      {
        greenSelect!= "product" &&
        <div>
        <button
          className={
            wtSelect == "customer" ? "master-btns" : "master-dummy-btns"
          }
          onClick={() => setWtSelect("customer")}
        >
          Customer
        </button>
        <button
          className={
            wtSelect == "supplier" ? "master-btns" : "master-dummy-btns"
          }
          onClick={() => setWtSelect("supplier")}
        >
          Supplier
        </button>
      </div>
      }
      <div>
        {/* {greenSelect} */}
        { greenSelect == "ledger" && (wtSelect == "customer" ? <CustomerLedger /> : <LedgerAccountComp />)}
        {greenSelect == "product" && <ProductRegisterComp/>}
      </div>
    </div>
  );
};

export default MasterDetailsComponent;