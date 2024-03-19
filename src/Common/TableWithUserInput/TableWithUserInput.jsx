// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Colors } from '../../Colors/Colors';
// // import './DynamicTable.css';

// const TableWithUserInput = ({ headsDataTypes, tableData, setTableData, productAndId }) => {
//   // const [tableData, setTableData] = useState([]);

// useEffect(() => {
//   addRow();
// }, []);

// const addRow = () => {
//   const newRow = {};
//   headsDataTypes.forEach((column) => {
//     newRow[column.heading] = '';
//   });
//   setTableData([...tableData, newRow]);
//   // console.log([...tableData, newRow]);
// };

// const pasteTableFun = async () => {
//   try {
//     const clipboardData = await navigator.clipboard.readText();
//     const parsedData = JSON.parse(clipboardData);
//     setTableData(parsedData);
//     localStorage.setItem('copiedTableData', clipboardData);
//   } catch (error) {
//     console.error('Error pasting table data:', error);
//   }
// };

// const handleCellChange = (rowIndex, columnName, value) => {
//   if (columnName === "Product Name") {
//     const selectedProduct = productAndId.find(
//       (product) => product.productName.toLowerCase() === value.toLowerCase()
//     );
//     if (selectedProduct) {
//       setTableData((prev) =>
//         prev.map((val, i) =>
//           i === rowIndex
//             ? { ...val, "Product Name": selectedProduct.productName, "Product Id": selectedProduct.productId,Quantity : "","Total Amount" : "" }
//             : val
//         )
//       );
//     } else {
//       setTableData((prev) =>
//         prev.map((val, i) =>
//           i === rowIndex ? { ...val, "Product Name": value, "Product Id": "", Rate :  "", Quantity : "","Total Amount" : "" } : val
//         )
//       );
//     }
//   } else if (columnName === "Product Id") {
//     if (value === "") {
//       setTableData((prev) =>
//         prev.map((val, i) =>
//           i === rowIndex ? { ...val, "Product Id": "", "Product Name": "", Quantity : "","Total Amount" : "" } : val
//         )
//       );
//     } else {
//       const selectedProduct = productAndId.find(
//         (product) => product.productId == value
//       );
//       if (selectedProduct) {
//         setTableData((prev) =>
//           prev.map((val, i) =>
//             i === rowIndex
//               ? { ...val, "Product Id": selectedProduct.productId, "Product Name": selectedProduct.productName,  Quantity : "","Total Amount" : "" }
//               : val
//           )
//         );
//       } else {
//         setTableData((prev) =>
//           prev.map((val, i) =>
//             i === rowIndex ? { ...val, "Product Id": value, "Product Name": "", Quantity : "","Total Amount" : "" } : val
//           )
//         );
//       }
//     }
//   } 

// else if (columnName === "Quantity") {
//   if (value === "") {
//     setTableData((prev) =>
//       prev.map((val, i) =>
//         i === rowIndex ? { ...val, "Quantity": "", "Total Amount": "" } : val
//       )
//     );
//   } else {
//     const selectedProduct = productAndId.find(
//       (product) => product.productId == tableData[rowIndex]["Product Id"]
//     );

//     if (selectedProduct) {
//       let rate = tableData[rowIndex].Rate === "" ? 0 : tableData[rowIndex].Rate;
//       setTableData((prev) =>
//         prev.map((val, i) =>
//           i === rowIndex
//             ? {
//                 ...val,
//                 "Quantity": value,
//                 "Total Amount": Number(value) * rate,
//               }
//             : val
//         )
//       );
//     } else {
//       setTableData((prev) =>
//         prev.map((val, i) =>
//           i === rowIndex ? { ...val, "Quantity": value, "Total Amount": "" } : val
//         )
//       );
//     }
//   }
// }

// else if (columnName === "Rate") {
//   if (value === "") {
//     setTableData((prev) =>
//       prev.map((val, i) =>
//         i === rowIndex ? { ...val, "Rate": "", "Total Amount": "" } : val
//       )
//     );
//   } else {
//     const selectedProduct = productAndId.find(
//       (product) => product.productId == tableData[rowIndex]["Product Id"]
//     );

//     if (selectedProduct) {
//       let quant =
//         tableData[rowIndex].Quantity === "" ? 0 : tableData[rowIndex].Quantity;
//       setTableData((prev) =>
//         prev.map((val, i) =>
//           i === rowIndex
//             ? {
//                 ...val,
//                 "Rate": value,
//                 "Total Amount": Number(value) * quant,
//               }
//             : val
//         )
//       );
//     } else {
//       setTableData((prev) =>
//         prev.map((val, i) =>
//           i === rowIndex ? { ...val, "Rate": value, "Total Amount": "" } : val
//         )
//       );
//     }
//   }
// }

// else if (columnName == "Mark" || columnName == "Customer Name" || columnName == "Date" || columnName ==	"Stock In" || columnName ==	"Stock Out" || columnName == "Balance" || columnName == "Remark"
// ){
//     const updatedData = [...tableData];
//     updatedData[rowIndex][columnName] = value;
//     setTableData(updatedData);
// }
// };

//   const handleKeyPress = async (e, rowIndex, columnName) => {
//     if (e.key === 'Enter') {
//       e.preventDefault()
//       if (columnName === headsDataTypes[headsDataTypes.length - 1].heading) {
//         const isRowValid = Object.values(tableData[rowIndex]).filter((value) => value == '');
//         // Object.values(tableData[rowIndex]).some((value) => console.log(value))
//         // console.log(tableData[rowIndex]);
//         if(isRowValid.length>0){
//           alert("Fill All input boxes")
//         }
//         else{
//           await addRow();
//         }
//         const newRowClass = document.getElementById(`${rowIndex + 1}-${headsDataTypes[0].heading}`);
//         if (newRowClass) {
//           newRowClass.focus();
//         }
//       } else {
//         const nextColumnIndex = headsDataTypes.findIndex((col) => col.heading === columnName) + 1;
//         const nextColumnName = headsDataTypes[nextColumnIndex].heading;
//         const nextInput = document.getElementById(`${rowIndex}-${nextColumnName}`);
//         if (nextInput) {
//           nextInput.focus();
//         }
//       }
//     }
//   };

//   return (
//     <div>
//       {tableData && tableData.length > 0 ? (
//         <table className="table print-table" onPaste={pasteTableFun}>
//           <thead>
//             <tr>
//               {headsDataTypes && headsDataTypes.map(({ heading }, i) => (
//                 <th
//                   key={i}
//                   style={{
//                     border: `1px solid white`,
//                     textAlign: 'center',
//                     backgroundColor: Colors.lightViolet,
//                     // backgroundColor: 'blue',
//                     fontSize: '14px',
//                     color: `white`,
//                     fontWeight: '500',
//                     padding: '15px 0px',
//                   }}
//                 >
//                   {heading}
//                 </th>
//               ))}
//             </tr>
//           </thead>
          // <tbody>
          //   {tableData.map((row, rowIndex) => (
          //     <tr
          //       key={rowIndex}
          //       style={{
          //         fontSize: '13px',
          //         fontWeight: '500',
          //       }}
          //     >
          //       {headsDataTypes && headsDataTypes.map((column, cellIndex) => (
          //         <td style={{ border: `1px solid ${Colors.lightViolet}`, padding: '20px', textAlign: 'center' }} key={cellIndex}>
          //               <input
          //                 style={{borderWidth:"0px",outline:"none",width:"100%",textAlign:"center"}}
          //                 type={column.dataType}
          //                 value={column.heading == "S.No" ? rowIndex+1 :row[column.heading] || ''}
          //                 onChange={(e) => handleCellChange(rowIndex, column.heading, e.target.value)}
          //                 onKeyDown={(e) => handleKeyPress(e, rowIndex, column.heading)}
          //                 id={`${rowIndex}-${column.heading}`}
          //                 className="input-cell"
          //                 required
          //           /> 
          //         </td>
          //       ))}
          //     </tr>
          //   ))}
          // </tbody>
//         </table>
//       ) : (
//         `No Data's to display`
//       )}
//     </div>
//   );
// };

// export default TableWithUserInput;



import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Colors } from '../../Colors/Colors';
import { useDrag, useDrop } from 'react-dnd';
import update from 'immutability-helper';
// import './DynamicTable.css';

const ColumnHeader = ({ id, index, moveColumn, heading }) => {
  const [, ref] = useDrag({
    type: 'COLUMN',
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: 'COLUMN',
    hover: (item) => {
      if (item.index !== index) {
        moveColumn(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <th
      ref={(node) => ref(drop(node))}
      style={{
        border: `1px solid white`,
        textAlign: 'center',
        backgroundColor: Colors.lightViolet,
        fontSize: '14px',
        color: `white`,
        fontWeight: '500',
        padding: '15px 0px',
        cursor: 'move',
      }}
    >
      {heading}
    </th>
  );
};

const TableWithUserInput = ({ headsDataTypes, tableData, setTableData, productAndId, date, customerNames, boxDetails }) => {
  const [columns, setColumns] = useState(headsDataTypes);
  const [selectedProd, setSelectedProd] = useState(null);
  const [boxBalance, setBoxBalance] = useState(0)
  // console.log(headsDataTypes);

  useEffect(() => {
    if(tableData.length <= 0){
      addRow(); 
    }
}, []);

const addRow = () => {
  const newRow = {};
  headsDataTypes.forEach((column) => {
    if(column.heading != "Date"){
      newRow[column.heading] = '';
    }
    else{
      newRow[column.heading] = date;
    }
  });
  setTableData([...tableData, newRow]);
  // console.log([...tableData, newRow]);
};

const pasteTableFun = async () => {
  try {
    const clipboardData = await navigator.clipboard.readText();
    const parsedData = JSON.parse(clipboardData);
    setTableData(parsedData);
    localStorage.setItem('copiedTableData', clipboardData);
  } catch (error) {
    console.error('Error pasting table data:', error);
  }
};

const handleCellChange = (rowIndex, columnName, value) => {
  // let selectedProduct = null;
  if (columnName === "Product Name") {
    const selectedProduct = productAndId.find(
      (product) => product.productName.toLowerCase() === value.toLowerCase()
    );
    setSelectedProd(selectedProduct)
    if (selectedProduct) {
      // console.log(tableData.map((val)=>Object.keys(val).includes("Product Id")));
      // tableData.map((val)=>Object.keys(val).includes("Product Id")) ?
      setTableData((prev) =>
        prev.map((val, i) =>
          i === rowIndex
            ? { ...val, "Product Name": selectedProduct.productName, "Product Id": selectedProduct.productId,Quantity : "","Total Amount" : "", Mark : selectedProduct.mark ? "" : "---" }
            : val
        )
      ) 
    //   : setTableData((prev) =>
    //   prev.map((val, i) =>
    //     i === rowIndex
    //       ? { ...val, "Product Name": selectedProduct.productName }
    //       : val
    //   )
    // )
    } else {
      setSelectedProd(null)
      setTableData((prev) =>
        prev.map((val, i) =>
          i === rowIndex ? { ...val, "Product Name": value, "Product Id": "", Rate :  "", Quantity : "","Total Amount" : "" } : val
        )
      );
    }
  } else if (columnName === "Product Id") {
    if (value === "") {
      setSelectedProd(null)
      setTableData((prev) =>
        prev.map((val, i) =>
          i === rowIndex ? { ...val, "Product Id": "", "Product Name": "", Quantity : "","Total Amount" : ""} : val
        )
      );
    } else {
      const selectedProduct = productAndId.find(
        (product) => product.productId == value
      );
      setSelectedProd(selectedProduct)
      if (selectedProduct) {
        // console.log(tableData);
        setTableData((prev) =>
          prev.map((val, i) =>
            i === rowIndex
              ? { ...val, "Product Id": selectedProduct.productId, "Product Name": selectedProduct.productName,  Quantity : "","Total Amount" : "", Mark : selectedProduct.mark ? "" : "---" }
              : val
          )
        );
      } else {
        setTableData((prev) =>
          prev.map((val, i) =>
            i === rowIndex ? { ...val, "Product Id": value, "Product Name": "", Quantity : "","Total Amount" : "" } : val
          )
        );
      }
    }
  }

else if (columnName === "Quantity") {
  if (value === "") {
    setTableData((prev) =>
      prev.map((val, i) =>
        i === rowIndex ? { ...val, "Quantity": "", "Total Amount": "" } : val
      )
    );
  } else {
    const selectedProduct = productAndId.find(
      (product) => product.productId == tableData[rowIndex]["Product Id"]
    );

    if (selectedProduct) {
      let rate = tableData[rowIndex].Rate === "" ? 0 : tableData[rowIndex].Rate;
      setTableData((prev) =>
        prev.map((val, i) =>
          i === rowIndex
            ? {
                ...val,
                "Quantity": value,
                "Total Amount": Number(value) * rate,
              }
            : val
        )
      );
    } else {
      setTableData((prev) =>
        prev.map((val, i) =>
          i === rowIndex ? { ...val, "Quantity": value, "Total Amount": "" } : val
        )
      );
    }
  }
}

else if (columnName === "Rate") {
  if (value === "") {
    setTableData((prev) =>
      prev.map((val, i) =>
        i === rowIndex ? { ...val, "Rate": "", "Total Amount": "" } : val
      )
    );
  } else {
    const selectedProduct = productAndId.find(
      (product) => product.productId == tableData[rowIndex]["Product Id"]
    );

    if (selectedProduct) {
      let quant =
        tableData[rowIndex].Quantity === "" ? 0 : tableData[rowIndex].Quantity;
      setTableData((prev) =>
        prev.map((val, i) =>
          i === rowIndex
            ? {
                ...val,
                "Rate": value,
                "Total Amount": Number(value) * quant,
              }
            : val
        )
      );
    } else {
      setTableData((prev) =>
        prev.map((val, i) =>
          i === rowIndex ? { ...val, "Rate": value, "Total Amount": "" } : val
        )
      );
    }
  }
}
else if(columnName == "Mark"){
  if(selectedProd && selectedProd.mark){
    const updatedData = [...tableData];
    updatedData[rowIndex][columnName] = value;
    setTableData(updatedData);
  }
  // console.log(selectedProd);
}
else if(columnName == "Customer Name"){
    const boxBal = boxDetails.find((val)=>val["Customer Name"].toLowerCase() == value.toLowerCase())
    // console.log(boxBal);
    if(boxBal){
      // console.log(tableData);
      const totalBal = String(Number(Number(boxBal.Balance)-Number(tableData[rowIndex]["Stock In"])+Number(tableData[rowIndex]["Stock Out"])))
      setTableData(tableData.map((val,i)=> i == rowIndex ? {...val,Balance : totalBal,"Customer Name" : boxBal["Customer Name"]} : val));
      setBoxBalance(boxBal.Balance);
    }
    else{
      const updatedData = [...tableData];
      updatedData[rowIndex][columnName] = value;
      updatedData[rowIndex]["Balance"] = String(Number(0-Number(tableData[rowIndex]["Stock In"])+Number(tableData[rowIndex]["Stock Out"])));
      setTableData(updatedData);
    }
}
else if(columnName ==	"Stock Out" || columnName ==	"Stock In"){
    // let bal = tableData[rowIndex].Balance;
    // console.log(tableData);
    // console.log(bal-tableData[rowIndex]["Stock In"]);
    const updatedData = [...tableData];
    updatedData[rowIndex][columnName] = value;
    updatedData[rowIndex]["Balance"] = String(Number(Number(boxBalance)-Number(tableData[rowIndex]["Stock In"])+Number(tableData[rowIndex]["Stock Out"])));
    setTableData(updatedData);
}
else if (columnName == "Date" || columnName ==	"Stock Out" || columnName == "Remark" || columnName == "Product Quantity"
){
    const updatedData = [...tableData];
    updatedData[rowIndex][columnName] = value;
    setTableData(updatedData);
    // console.log(columnName);
}
};

const handleKeyPress = async (e, rowIndex, columnName) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const lastColumnIndex = headsDataTypes.length - 1;
    const isLastColumn = columnName === headsDataTypes[lastColumnIndex].heading;
    const isMarkColumn = (columnName === 'Mark' || columnName === "Remark");

    // console.log(columnName);
    // console.log(isMarkColumn);
    // console.log(lastColumnIndex && !isMarkColumn);

    if (isLastColumn && !isMarkColumn) {
      const isRowValid = headsDataTypes
        .filter(column => requiredChecker(column.heading, rowIndex))
        .some(column => !tableData[rowIndex][column.heading]);
      const isEmpty = Object.values(tableData[rowIndex]).some((val)=>val!="")
      // console.log(isEmpty);
      if (isRowValid || !isEmpty) {
        alert("Please fill all required fields before adding a new row.");
        return;
      }
      // await addRow();
      const existRowClass = document.getElementById(`${rowIndex + 1}-${headsDataTypes[0].heading}`);
      // console.log(newRowClass);
      // console.log(existRowClass);
      if (existRowClass) {
        existRowClass.focus();
      }
      else{
        await addRow();
        const newRowClass = document.getElementById(`${rowIndex + 1}-${headsDataTypes[0].heading}`);
        if(newRowClass){
          newRowClass.focus();
        }
      }
    } else {
      const nextColumnIndex = headsDataTypes.findIndex(col => col.heading === columnName) + 1;
      // console.log();
      const nextColumnName = headsDataTypes[nextColumnIndex].heading;
      const nextInput = document.getElementById(`${rowIndex}-${nextColumnName}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  }
};

  const moveColumn = (fromIndex, toIndex) => {
    // Update the order of columns in the state
    const updatedColumns = [...columns];
    const [movedColumn] = updatedColumns.splice(fromIndex, 1);
    updatedColumns.splice(toIndex, 0, movedColumn);
    setColumns(updatedColumns);
    // console.log(updatedColumns);
  
    // Update the order of data in the state based on the new column order
    setTableData((prevData) => {
      const updatedData = prevData.map((row) => {
        const newRow = {};
        updatedColumns.forEach(({ heading }) => {
          newRow[heading] = row[heading];
        });
        return newRow;
      });
      // console.log(updatedData);
      return updatedData;
    });
  };

  const requiredChecker = (val, rowIndex)=>{
    // console.log(Object.values(tableData[rowIndex]));
    const isRowValid = Object.values(tableData[rowIndex]).some((val)=>val!="");
    // console.log(isRowValid);
    // console.log(tableData);
    if(isRowValid || tableData.length == 1){
      return (val == "Product Id" || val == "Product Name" || val == "Quantity" || val == "Rate" || val == "Total Amount" || val == "Date" || val == "Customer Name" || val == "Stock In" || val == "Stock Out" || val == "Balance")
    }
    else{
      return false;
    }
  }

  return (
    <div>
      {tableData && tableData.length > 0 ? (
        <table className="table print-table" onPaste={pasteTableFun}>
          <thead>
            <tr>
              {columns.map(({ heading, dataType }, i) => (
                <ColumnHeader key={i} id={i} index={i} moveColumn={moveColumn} heading={heading} />
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                style={{
                  fontSize: '13px',
                  fontWeight: '500',
                }}
              >
                {headsDataTypes && headsDataTypes.map((column, cellIndex) => (
                  <td style={{ border: `1px solid ${Colors.lightViolet}`, padding: '20px', textAlign: 'center' }} key={cellIndex}>
                        <input
                          style={{borderWidth:"0px",outline:"none",width:"100%",textAlign:"center"}}
                          type={column.dataType}
                          value={column.heading == "S.No" ? row[column.heading] = rowIndex+1 :row[column.heading] || ''}
                          onChange={(e) => handleCellChange(rowIndex, column.heading, e.target.value)}
                          onKeyDown={(e) => handleKeyPress(e, rowIndex, column.heading)}
                          id={`${rowIndex}-${column.heading}`}
                          className="input-cell"
                          required={requiredChecker(column.heading,rowIndex)}
                        />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        `No Data's to display`
      )}
    </div>
  );
};

export default TableWithUserInput;