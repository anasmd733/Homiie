import React, { useEffect, useState, useRef } from 'react';
import OptionButton from '../OptionButton/OptionButton';
import { HiSortDescending } from "react-icons/hi";
import Paragraph from '../Paragraph/Paragraph';
import "./Sort.css";
import { ImCross } from "react-icons/im";

const Sort = () => {
    const [value, setValue] = useState();
    const [show, setShow] = useState(false);
    const [door, setDoor] = useState(false);
    const ArrayValues = ["A-Z Sort"];
    const wrapperRef = useRef(null); 

    const Handle = () => {
        setShow(!show);
    };

    const handleSort = (i) => {
        if (i === 0) {
            setValue("A-Z Sort");
            setDoor(true);
            setShow(false);
        } else if (i === 1) {
            setValue("Date Sort");
        }
    };

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setDoor(false);
            setShow(false)
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        
    }, []);

    return (
        <div ref={wrapperRef}>
            {
                door === false ?
                    <div >
                        <OptionButton
                            onClick={Handle}
                            iscricrle={false}
                            icon={<HiSortDescending fontSize={"20px"} />}
                        />
                    </div>
                    :
                    <div className='sorting-para-cross-div'>
                        <Paragraph value={"A-Z Sort"} />
                        <ImCross className='Sort-ImCross' onClick={() => { setDoor(false) }} />
                    </div>
            }

            {show === true ? (
                <div className='Main-sort-Div'>
                    {ArrayValues.map((Values, index) => (
                        <div key={index}
                            className='Sort-Paragraph-division'
                            onClick={() => { handleSort(index) }}>
                            <Paragraph value={Values} className='Sort-Paragraph' />
                        </div>
                    ))}
                </div>
            ) :
                null
            }
        </div>
    );
};

export default Sort;
