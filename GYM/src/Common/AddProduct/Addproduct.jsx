import React, { useState } from "react";
import CommonInput from "../Input/Input";
import CommonPara from "../Para/Para";
import CommonButton from "../Button/Button";
import { IoIosArrowBack } from "react-icons/io";

const Addproduct = ({ onSave ,handleback }) => {
  const [newproduct, setnewproduct] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    stockQuantity: "",
  });

  const handlechange = (e, FieldName) => {
    const { value } = e.target;
    setnewproduct((getdata) => ({ ...getdata, [FieldName]: value }));
  };
  const handleclick = () => {
    let emptyfield = false;
    Object.values(newproduct).forEach(value => {
      if(value === '') {
        emptyfield = true;
      }
    });

    if (emptyfield) {
      alert('please fill the box')
    } else {
      onSave(newproduct);
    }
  };


  const fields = [
    { placeholder: "Product Id", fieldname: "id",type:'number',step:'0.01' },
    { placeholder: "Product Name", fieldname: "name" , type:'text',step:'0.01' },
    { placeholder: "Category", fieldname: "category" , type:'text',step:'0.01' },
    { placeholder: "Price", fieldname: "price",type:'number',step:'0.01' },
    { placeholder: "Stock Quality", fieldname: "stockQuantity", type:'number',step:'0.01' },
  ];
  return (
    <div className="EditCon">
      <div className="editcontainer">
        <div className="popupHead">
        <CommonButton className='backbtn' onClick={()=>handleback()} label={<IoIosArrowBack/>}/>
        <CommonPara className="edittitle"  label2="Add Product" />
        </div>
        {fields.map((field, index) => (
          <CommonInput
          step={field.step}
          type={field.type}
            value={newproduct[field.fieldname]}
            key={index}
            className="editinput"
            placeholder={field.placeholder}
            onchange={(e) => handlechange(e, field.fieldname)}
          />
        ))}
        <CommonButton onClick={handleclick} className="editbtn" label="Save" />
      </div>
    </div>
  );
};

export default Addproduct;
