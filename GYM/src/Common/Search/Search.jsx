import React from 'react';
import CommonInput from '../Input/Input';
import "./Search.css";
import { FaSearch } from "react-icons/fa";

const Search = ({ originalData, setFilteredData }) => {
  const handleInputChange = (event) => {
    const inputValue = event.target.value.toLowerCase(); 
    const filtered = originalData.filter(item => item.Name.toLowerCase().includes(inputValue));
    setFilteredData(filtered); 
  };

  return (
    <div>
      <div className='Search-FaSearch'><FaSearch/></div>
      <CommonInput type={"text"} className="Search-CommonInput" onChange={handleInputChange} />
    </div>
  );
};

export default Search;
