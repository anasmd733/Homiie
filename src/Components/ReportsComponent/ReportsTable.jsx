import React from 'react'
import { Table } from 'react-bootstrap'
// import { SupplierReportsTableArr } from './SupplierReportsTableArr'
import { Colors } from '../../Colors/Colors';

const ReportsTable = ({ SupplierReportsTableArr }) => {
    const headings = SupplierReportsTableArr && SupplierReportsTableArr.length >0 ? Object.keys(SupplierReportsTableArr[0]) : [];
  return (
    <Table borderless style={{overflowX:"scroll",boxShadow:"0px 0px 5px rgb(183, 183, 183)"}}>
        <thead>
        <tr>
              {headings.map((row, i) => (
                <th
                  key={i}
                  style={{
                    // border: `1px solid ${Colors.white}`,
                    textAlign: "center",
                    backgroundColor: Colors.blue,
                    fontSize: "14px",
                    color: `${Colors.white}`,
                    fontWeight: "500",
                    padding:'15px 0px',
                  }}
                >
                  {row != "id" ? row : "Sno"}
                </th>
              ))}
            </tr>
        </thead>
        <tbody>
        {SupplierReportsTableArr.map((row, i) => (
              <tr
                key={i}
                style={{
                  borderBottom: `10px solid white`,
                  fontSize: "13px",
                  fontWeight: "500",
                }}
              >
                {headings.map((heading, ind) => (
                  <td style={{padding:'20px',backgroundColor:"#F7F9FC",textAlign:"center"}} key={ind}>{heading!= "id" ? row[heading] : i+1}</td>
                ))}
              </tr>
            ))}
        </tbody>
    </Table>
  )
}

ReportsTable.defaultProps = {
  SupplierReportsTableArr : []
}

export default ReportsTable