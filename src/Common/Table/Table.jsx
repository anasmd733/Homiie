import React from "react";
import Table from "react-bootstrap/Table";
import { Colors } from "../../Colors/Colors";
import Textbox from "../Textbox/Textbox";
import "./Table.css";

function Table1({ tableDatas, onProductRateChange }) {
  const headings = tableDatas && tableDatas.length > 0 ? Object.keys(tableDatas[0]) : [];

  const handleProductRateChange = (index, newValue) => {
    // Call parent function to handle product rate change
    onProductRateChange(index, newValue);
  };

  return (
    <div style={{ margin: "0px", padding: "0px" }}>
      {tableDatas && tableDatas.length > 0 ? (
        <Table className="print-table" id="tableComponents" bordered hover style={{ overflowX: "scroll" }}>
          <thead>
            <tr>
              {headings.map((row, i) => (
                <th
                  key={i}
                  style={{
                    border: `1px solid ${Colors.white}`,
                    textAlign: "center",
                    backgroundColor: Colors.lightViolet,
                    fontSize: "14px",
                    color: `${Colors.white}`,
                    fontWeight: "500",
                    padding: "15px 0px",
                  }}
                >
                  {row !== "id" ? row : "Sno"}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableDatas.map((row, i) => (
              <tr
                key={i}
                style={{
                  border: `1px solid ${Colors.lightViolet}`,
                  fontSize: "13px",
                  fontWeight: "500",
                }}
              >
                {headings.map((heading, ind) => (
                  <td  style={{ padding: "20px", textAlign: "center" }} key={ind}>
                    {heading === "id" ? i + 1 : (
                      heading === "productRate" ? 
                        <Textbox 
                          onchange={(e) => handleProductRateChange(i, e.target.value)} 
                          className='Table1-Textbox' 
                          value={row[heading]} 
                          type={"number"} 
                          readOnly={true} /> : 
                          row[heading]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        `No Data's To Display`
      )}
    </div>
  );
}

export default Table1;
