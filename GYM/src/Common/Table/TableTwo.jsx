  import React, { useState, useEffect } from "react";
  import "./Table.css";
  import Renewal from '../../asset/renewal.png'

  const TableTwo = ({ FilteredData, maxHeight ,setValue ,Validation ,isChecked}) => {
    const [height, setHeight] = useState(maxHeight);
    const [dataKeys, setDataKeys] = useState([]);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState({});

    useEffect(() => {
      if (FilteredData.length > 0) {
        const keys = Object.keys(FilteredData[0]);
        setDataKeys(keys.filter(key => key !== 'id'));
      }
    }, [FilteredData]);

  
    const handleCheckboxChange = (rowIndex) => {
      setSelectedCheckboxes(prevState => ({
        ...prevState,
        [rowIndex]: !prevState[rowIndex] 
      }));
    };
    
    useEffect(() => {
      setValue(selectedCheckboxes);
    }, [selectedCheckboxes]);
    
    return (
      <div className="TableWhole">
        <div className="TableContainer" style={{ maxHeight: height }}>
          <div className="table-container">
            <div className="table-row header">
              {
                Validation===true ?
                <div className="table-celll">Action</div> :
                null
              }
              <div className="table-celll">S No</div>
              {dataKeys.map((column, index) => (
                <div key={index} className="table-celll"> 
                  {column}
                </div>
              ))}
            </div>
            <div className="TableData">
              {FilteredData.map((row, rowIndex) => (
                <div className="table-row" key={rowIndex}>
                  
                    {
                      Validation ===true ?
                      <div className="table-cell">
                        <input 
                        type="checkbox"
                        checked={isChecked===true ? selectedCheckboxes|| false : null }
                        onChange={() => handleCheckboxChange(rowIndex)} 
                        onClick={selectedCheckboxes|| false }
                        />  
                    </div>
                    :
                    null
                    }
              
                  <div className="table-cell">{rowIndex + 1}</div> 
                  {dataKeys.map((key, colIndex) => (
                    <div key={colIndex} className="table-cell">
                      {key === 'Profile' ? 
                        <img src={row[key]} alt={row[key]} /> : 
                        row[key]
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

  export default TableTwo;
