import React, { useState } from "react";
import "./Table.css";
import CommonImage from "../Image/Image";
import Renewal from '../../asset/renewal.png'

const Table = ({ data, columns, maxHeight,HandelRenewel }) => {
  const [height, setHeight] = useState(maxHeight);
  
  return (
    <div className="TableWhole">
      <div className="TableContainer" style={{ maxHeight: maxHeight }}>
        <div className="table-container">
          <div className="table-row header">
            {columns.map((column, index) => (
              <div key={index} className="table-celll">
                {column.Header}
              </div>
            ))}
          </div>
         <div className="TableData">
         {data.map((row, rowIndex) => (
            <div className="table-row" key={rowIndex}>
              {columns.map((column, colIndex) => (
                <div key={colIndex} className="table-cell">
                  {column.Datakey === 'profile' ? (
                    <div className="TableProfile">
                      <CommonImage width='60px' height='55px' Image={row[column.Datakey]} />
                    </div>
                  ) : column.Header === 'Renewal' ? 
                    <CommonImage onClick={()=>HandelRenewel()} width='25px' Image={Renewal} />
                    :
                      <div>{row[column.Datakey]}</div>
                  }
                </div>
              ))}
            </div>
          ))}
         </div>
        </div>
      </div>
    </div>
  );
};

export default Table;