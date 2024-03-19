import React from 'react'
import ReportsHeadSearchComp from '../../ReportsHeadSearchComp'
import DropDownComp from '../../../../Common/DropDown/DropDown'
import Table1 from '../../../../Common/Table/Table'
import { SupplierPurchaseArray } from './SUpplierPurchaseArray'
// import { SupplierPurchaseArray } from './SupplierPurchaseArray.js'
import BelowTableButtonIndex from '../../../../Common/BelowTableButton/BelowTableButtonIndex'

const SupplierPurchaseReports = () => {
  return (
    <div>
      <div
        style={{
          backgroundColor: "white",
          padding: "10px",
          marginTop: "10px",
          boxShadow: "0px 0px 5px rgb(183, 183, 183)",
        }}
      >
        <ReportsHeadSearchComp/>
        <div style={{ margin: "20px 0px" }}>
          <DropDownComp
            DropDownValuesArr={[
              "Customer Name",
              "Customer Name",
              "Customer Name",
              "Customer Name",
              "Customer Name",
            ]}
          />
        </div>
        <div>
          <Table1 tableDatas={SupplierPurchaseArray} />
        </div>
      </div>
      <div style={{ marginTop: "15px" }}>
        <BelowTableButtonIndex />
      </div>
      </div>
  )
}

export default SupplierPurchaseReports