import OptionButton from '../OptionButton/OptionButton'
import { IoFilterSharp } from "react-icons/io5";
import React, { useState, useEffect } from 'react';
import Textbox from '../Textbox/Textbox';
import Label from '../Label/Label';
import Button from '../Submit/Button';
import './Filter.css';
import { FilterFunction } from './Filter';
import { ImCross } from "react-icons/im";
import BlueButton from '../Submit/BlueButton';
import FilteredDateButton from './FilteredDateButton';

const FilterButton = ({originalData,setFilteredData}) => {
  // console.log(originalData);
  const [date, setDate] = useState({
    from: "",
    to: ""
  });
  const [dup, setdup] = useState({
    from: "",
    to: ""
  });
  const [open,setopen]=useState()
  const [door,setdoor]=useState("false")

  const handleFromChange = (event1) => {
    const newFromDate = event1.target.value;
    setDate(prevDate => ({ ...prevDate, from: newFromDate }));
    setdup(prevDate => ({ ...prevDate, from: newFromDate }));
    //  updateDateState({ ...date, from: newFromDate });
  };

  const handleToChange = (event2) => {
    const newToDate = event2.target.value;
    setDate(prevDate => ({ ...prevDate, to: newToDate }));
      setdup(prevDate => ({ ...prevDate, to: newToDate }));
      // updateDateState({ ...date, to: newToDate });
  };


  const Reset=()=>{
    setdoor("false")
    FilterFunction(date,originalData,setFilteredData,door);
  }
  
  const SubmitDate = (e) => {
    e.preventDefault();
    if (new Date(date.to) > new Date(date.from)) {
      FilterFunction(date, originalData, setFilteredData, door);
      setopen(!open);
      setdoor("true");
      setdup({ from: "", to: "" });
    } 
    else {
      alert("To date should be greater than From date.");
    }
  };



  const Handle = () => {
    setopen(!open); 
    setdup({ from: "", to: "" });
    setDate({ from: "", to: "" })
  };
  
  
  return (
    <>
     {
      door ==="false" ? 
      <OptionButton
      onClick={Handle}
      iscricrle={false}
      icon={<IoFilterSharp fontSize={"20px"}/>}
      />:
      <FilteredDateButton
      value={`(${date.from}) - (${date.to})`}
      className="FilterButton-BlueButton"
      onclick={Reset}
      />
     }
      {
        open===true ? 


        <div className='FilterCard-Main-div'>
        <div className='FilterCard-Cross-div' onClick={Handle}>
        <ImCross style={{fontSize:"12px"}}/>
        </div>
        <form action="" onSubmit={SubmitDate}>
        <div className='FilterCard-text-label-div'>
        <Label htmlFor={"From"} value={"From"} />
       <Textbox
        type={"date"}
        className='FilterCard-Textbox'
        onchange={handleFromChange}
        value={dup.from}
        required={true}
      />

      <Label htmlFor={"To"} value={"To"} />
      <Textbox
        type={"date"}
        className='FilterCard-Textbox'
        onchange={handleToChange}
        value={dup.to}
        required={true}
      />
      </div>
      <Button value={"Done"} className='FilterCard-Button'/>
      </form>
    </div>
    :
        null
      }
    </>
  )
}

export default FilterButton