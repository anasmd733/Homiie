import React, { useState } from 'react';
import './SelectInput.css'; // Import CSS file

const SelectInput = ({placeholder,data}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');



  const handleSelectChange = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  return (
    <div className="select-container">
      <div className="select-input" onClick={() => setIsOpen(!isOpen)}>
        {selectedValue || placeholder} <span className="arrow">&#9662;</span>
      </div>
      {isOpen && (
        <div className="options-container">
          {data.map((option, index) => (
            <div key={index} className="option" onClick={() => handleSelectChange(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectInput;
