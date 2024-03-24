import OptionButton from '../OptionButton/OptionButton';
import { IoFilterSharp } from "react-icons/io5";
import React, { useState, useRef, useEffect } from 'react';
import './Filter.css';
import CommonPara from '../Para/Para';

const FilterButton = ({ originalData, setFilteredData }) => {
  const [open, setOpen] = useState(false);
  const filterRef = useRef(null);
  const values = ["Male", "Female", "Both"];

  const handleFilterClick = (index) => {
    let filteredData = [];

    if (index === 0) {
      filteredData = originalData.filter(item => item.Gender === 'Male');
    } else if (index === 1) {
      filteredData = originalData.filter(item => item.Gender === 'Female');
    } else if (index === 2) {
      filteredData = originalData;
    }

    setFilteredData(filteredData);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterRef]);

  return (
    <>
      <OptionButton
        onClick={handleToggle}
        iscricrle={false}
        icon={<IoFilterSharp fontSize={"20px"} />}
      />
      {open && (
        <div ref={filterRef} className='FilterCard-Main-div'>
          {values.map((item, index) => (
            <CommonPara onClick={() => handleFilterClick(index)} key={index} label={item} className="FilterButton-Para-component" />
          ))}
        </div>
      )}
    </>
  );
};

export default FilterButton;
