import React from 'react';
import './OrderCard.css'; // CSS file for styling
import { data } from '../../Data/Data';

const Table = () => {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
            <th>Header 3</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="table-row">
              <td>{row.Age}</td>
              <td>{row.City}</td>
              <td>{row.PhoneNo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
