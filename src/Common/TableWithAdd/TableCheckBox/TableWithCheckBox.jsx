import Table from "react-bootstrap/Table";
import React, { useState } from "react";
import {
  AddCircleOutline,
  Delete,
  DeleteOutline,
  ModeEdit,
  WhatsApp,
} from "@mui/icons-material";
import { Colors } from "../../../Colors/Colors";
// import { TableWithAddArr } from "./tableWithAddArr";

function TableWithCheckBox({ TableWithAddArr, style }) {
  const headings =
    TableWithAddArr && TableWithAddArr.length > 0
      ? Object.keys(TableWithAddArr[0])
      : [];
  const [isHovered, setIsHovered] = useState(
    Array(TableWithAddArr ? TableWithAddArr.length : 0).fill(false)
  );

  const mouseOverHandler = (i) => {
    // setIsHovered(isHovered.map((bool,ind)=>ind==i ? true : false))
    setIsHovered((prev) => prev.map((bool, ind) => (ind === i ? true : false)));
  };

  const mouseLeaveHandler = (i) => {
    setIsHovered((prev) => prev.map((bool, ind) => (ind === i ? false : bool)));
  };
  return (
    <div style={{ ...style, overflowX: "auto" }}>
      {TableWithAddArr && TableWithAddArr.length > 0 ? (
        <Table id="tableComponents" bordered responsive>
          <thead>
            <tr>
              {headings.map((row, i) => (
                <th
                  key={i}
                  style={{
                    // border: `1px solid ${Colors.white}`,
                    textAlign: "center",
                    backgroundColor: Colors.lightViolet,
                    fontSize: "14px",
                    color: "#fff",
                    fontWeight: "500",
                    padding: "15px",
                  }}
                >
                  {row!="id" ? row : "Sno"}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TableWithAddArr.map((row, i) => (
              <React.Fragment key={i}>
                <tr
                  style={{
                    border: `1px solid ${Colors.lightViolet}`,
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                  onMouseOver={() => mouseOverHandler(i)}
                  onMouseLeave={() => mouseLeaveHandler(i)}
                >
                  {headings.map((heading, ind) => (
                    <td
                      style={{ textAlign: "center", padding: "15px" }}
                      key={ind}
                    >
                      {heading == "id" ? "Sno" : heading !== "Share" && heading !== "SelectPrint" ? (
                        row[heading] !== "" ? (
                          row[heading]
                        ) : (
                          `No Data's Found`
                        )
                      ) : heading === "SelectPrint" ? (
                        <input style={{height:"18px",width:"18px"}} type="checkbox" />
                      ) : (
                        <WhatsApp sx={{color:"grey",cursor:"pointer"}}/>
                      )}
                    </td>
                  ))}
                </tr>
                <tr
                  style={{
                    border: `0px solid ${Colors.white}`,
                    height: "25px",
                  }}
                  onMouseOver={() => mouseOverHandler(i)}
                  onMouseLeave={() => mouseLeaveHandler(i)}
                >
                  {isHovered[i] && (
                    <td
                      style={{ padding: "0px" }}
                      colSpan={headings.length}
                      className="icons-td"
                    >
                      <>
                        <AddCircleOutline
                          style={{
                            fontSize: "15px",
                            color: Colors.blue,
                            cursor: "pointer",
                          }}
                        />
                        <ModeEdit
                          style={{
                            fontSize: "15px",
                            color: Colors.blue,
                            cursor: "pointer",
                            marginLeft: "10px",
                          }}
                        />
                        <DeleteOutline
                          style={{
                            fontSize: "15px",
                            color: Colors.red,
                            marginLeft: "10px",
                            cursor: "pointer",
                          }}
                        />
                      </>
                    </td>
                  )}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      ) : (
        "No Data to Display "
      )}
    </div>
  );
}

// TableWithAdd.defaultProps = {
//   TableWithAddArr : []
// }

export default TableWithCheckBox;
