import React, { useState } from "react";
import GreenHoverButton from "../../../Common/GreenHoverButton/GreenHoverButton";
import ProductReportDetailsComponent from "./ProductReportDetails/ProductReportDetailsComponent";
import SalesReportsComponent from "./SalesReports/SalesReportsComponent";
import PurchaseReports from "./PurchaseReports/PurchaseReports";
import AdvanceOrderReports from "./AdvanceorderReports/AdvanceOrderReports";

const ProductReportsComponent = () => {
  const [selected, setSelected] = useState("productDetails");

  return (
    <div>
      <div style={{ display: "flex", gap: "10px" }}>
        <GreenHoverButton
          value={"Product Details"}
          style={{
            flex: "1",
            backgroundColor: selected == "productDetails" ? "#68D183" : "white",
            color : selected == "productDetails" ? "white" : "#333A44"
          }}
          onClick={() => setSelected("productDetails")}
        />
        <GreenHoverButton
          value={"Sales Report"}
          style={{
            flex: "1",
            backgroundColor: selected == "salesReport" ? "#68D183" : "white",
            color : selected == "salesReport" ? "white" : "#333A44"
          }}
          onClick={() => setSelected("salesReport")}
        />
        <GreenHoverButton
          value={"Purchase Report"}
          style={{
            flex: "1",
            backgroundColor: selected == "purchaseReport" ? "#68D183" : "white",
            color : selected == "purchaseReport" ? "white" : "#333A44"
          }}
          onClick={() => setSelected("purchaseReport")}
        />
        <GreenHoverButton
          value={"Advance order Report"}
          style={{
            flex: "1",
            backgroundColor: selected == "advanceOrder" ? "#68D183" : "white",
            color : selected == "advanceOrder" ? "white" : "#333A44"
          }}
          onClick={() => setSelected("advanceOrder")}
        />
      </div>
      {selected == "productDetails" ? <ProductReportDetailsComponent /> : selected == "salesReport" ? <SalesReportsComponent/> : selected == "purchaseReport" ? <PurchaseReports/>  : <AdvanceOrderReports/>}
    </div>
  );
};

export default ProductReportsComponent;
