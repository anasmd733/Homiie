import { Search } from "@mui/icons-material";
import React from "react";
import "./style.css";

const SearchBar = ({ onChangeHandler,className, style }) => {
  return (
    <div className={`search-bar-component ${className}`} style={style}>
      <input
        type="text"
        placeholder="Search"
        className={"search-inp"}
        onChange={onChangeHandler}
      />
      <Search className="search-icon" />
    </div>
  );
};

export default SearchBar;
