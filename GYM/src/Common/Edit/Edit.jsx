import React, { useState } from "react";
import CommonInput from "../Input/Input";
import "./Edit.css";
import CommonButton from "../Button/Button";
import CommonPara from "../Para/Para";
import { AiFillEdit } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";

const EditProduct = ({ data, onSave,handleback }) => {
  const [editedData, setEditedData] = useState(data);

  const handleChange = (e, key) => {
    setEditedData({
      ...editedData,
      [key]: e.target.value
    });
  };

  const handleSave = () => {
    onSave(editedData);
  };

  return (
    <div className="EditCon">
      <div className="editcontainer">
      <div className="popupHead">
        <CommonButton className='backbtn' onClick={()=>handleback()} label={<IoIosArrowBack/>}/>
        <CommonPara className="edittitle" label={<AiFillEdit/>}  label2="Edit Product" />
        </div>
       
        {Object.keys(editedData).map((key, index) => (
          <CommonInput
            key={index}
            value={editedData[key]}
            className="editinput"
            placeholder={key}
            onchange={(e) => handleChange(e, key)}
          />
        ))}
        <CommonButton  className="editbtn" label="Save" onClick={handleSave} />
      </div>
    </div>
  );
};

export default EditProduct;
