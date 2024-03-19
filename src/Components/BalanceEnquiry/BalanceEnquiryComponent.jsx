import React, { useState } from "react";
import GreenHoverButton from "../../Common/GreenHoverButton/GreenHoverButton";
import CustBalance from "./CustomerBalance/CustBalance";
import SuppBalance from "./SupplierBalance/SuppBalance";

const BalanceEnquiryComponent = () => {
  const [selected, setSelected] = useState("customer");
  return (
    <div>
      <div
        style={{
          fontWeight: "100",
          fontSize: "13px",
          color: "rgb(147, 147, 147)",
          cursor:"pointer",
          margin: "5px 0px 10px 0px"
        }}
      >
        {"Balance Enquiry"} <b>{">"}</b> {`${selected} balance`}
      </div>
      <div style={{ display: "flex", gap: "10px", padding: "10px 0px" }}>
        <GreenHoverButton
          style={{
            flex: "1",
            backgroundColor: selected == "customer" ? "#68D183" : "white",
            color: selected == "customer" ? "white" : "#333A44",
          }}
          value={"Customer Balance"}
          onClick={() => setSelected("customer")}
        />
        <GreenHoverButton
          style={{
            flex: "1",
            backgroundColor: selected == "supplier" ? "#68D183" : "white",
            color: selected == "supplier" ? "white" : "#333A44",
          }}
          value={"Supplier Balance"}
          onClick={() => setSelected("supplier")}
        />
      </div>
      <div>
        {
          selected == "customer" ? <CustBalance/> : <SuppBalance/>
        }
      </div>
    </div>
  );
};

export default BalanceEnquiryComponent;
