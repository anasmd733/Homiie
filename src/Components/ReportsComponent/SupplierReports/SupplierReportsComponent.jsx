import React, { useState } from "react";
import GreenHoverButton from "../../../Common/GreenHoverButton/GreenHoverButton";
import SupplierDetails from "./SupplierDetails/SupplierDetails";
import SupplierPurchaseReports from "./SupplierPurchaseReports/SupplierPurchaseReports";

const SupplierReportsComponent = () => {
  const [selected, setSelected] = useState("supplierDetails");

  return (
    <div>
      <div style={{ display: "flex", gap: "20px" }}>
        <GreenHoverButton
          onClick={() => setSelected("supplierDetails")}
          value={"Supplier Details"}
          style={{
            flex: "1",
            backgroundColor: selected == "supplierDetails" ? "#68D183" : "white",
            color : selected == "supplierDetails" ? "white" : "#333A44"
          }}
        />
        <GreenHoverButton
          onClick={() => setSelected("supplierReports")}
          value={"Supplier Purchase Report"}
          style={{
            flex: "1",
            backgroundColor: selected == "supplierReports" ? "#68D183" : "white",
            color : selected == "supplierReports" ? "white" : "#333A44"
          }}
        />
      </div>
      <div>
        {
          selected == "supplierDetails" ? <SupplierDetails/> : <SupplierPurchaseReports/>
        }
      </div>
    </div>
  );
};

export default SupplierReportsComponent;
