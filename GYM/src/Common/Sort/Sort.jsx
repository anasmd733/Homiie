import OptionButton from '../OptionButton/OptionButton';
import React, { useState, useRef, useEffect } from 'react';
import { HiSortDescending } from "react-icons/hi";
import CommonPara from '../Para/Para';
import "./Sort.css";

const Sort = ({ handleSortClick }) => {
    const [open, setOpen] = useState(false);
    const filterRef = useRef(null);
    const values = ["Age", "Name"];

    const handle = () => {
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

    const handleSortItemClick = (index) => {
        handleSortClick(index);
        setOpen(false); 
    };

    return (
        <div>
            <OptionButton
                onClick={handle}
                iscricrle={false}
                icon={<HiSortDescending fontSize={"20px"} />}
            />
            {open && (
                <div ref={filterRef} className='Sort-Main-div'>
                    {values.map((item, index) => (
                        <CommonPara onClick={() => handleSortItemClick(index)} key={index} label={item} className="Sort-Para-component" />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Sort;
