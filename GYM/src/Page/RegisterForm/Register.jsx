import React, { useState } from "react";
import "./Register.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import CommonInput from "../../Common/Input/Input";
import SelectInput from "../../Common/SelectInput/SelectInput";
import CommonButton from "../../Common/Button/Button";
import TakePhoto from "../../Components/TakePhoto/TakePhoto";
import { TbCaptureFilled } from "react-icons/tb";

const Register = () => {
  const [photos, setPhotos] = useState([]);
  const [showPhoto, setShowPhoto] = useState(false);
  const [formData, setFormData] = useState([]);

  const inputType = [
    { placeholder: "Name", type: "text" },
    { placeholder: "Age", type: "text" },
    {
      placeholder: "Gender",
      type: "dropdown",
      data: ["Male", "Female", "Others"],
    },
    { placeholder: "Join Date", type: "Date" },
    { placeholder: "City", type: "text" },
    { placeholder: "Contact Number", type: "number" },
    {
      placeholder: "Membership Duration",
      type: "dropdown",
      data: ["12 Months", "6 Months", "3 Months", "2 Months", "1 Months"],
    },
    { placeholder: "Personal Trainer", type: "radio" },
    { placeholder: "Payment Mode", type: "dropdown", data: ["Online", "Cash"] },
  ];

  const handleInputChange = (index, value) => {
    const newFormData = [...formData];
    newFormData[index] = { ...newFormData[index], value };
    setFormData(newFormData);
  };

  const handlePhotoChange = (selectedPhoto) => {
    setPhotos(selectedPhoto);
    setShowPhoto(true); 
  };

  const handleSubmit = () => {
    console.log(formData); // This will log the form data containing all input values
    // You can now send this formData to your backend API
  };

  return (
    <div className="UserRegisterContainer">
      <div className="back">
        <AiOutlineArrowLeft /> Back
      </div>
      <div className="Heading">
        <u>Re</u>gistration form
      </div>
      <div className="RegisterForm">
        <div className="FormContent">
          {inputType.map((value, index) => (
            <React.Fragment key={index}>
              {value.type === "text" ||
              value.type === "number" ||
              value.type === "Date" ? (
                <CommonInput
                  key={index}
                  className="RegisterInput"
                  placeholder={value.placeholder}
                  type={value.type}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              ) : value.type === "radio" ? (
                <div className="radio">
                  <CommonInput
                    className="radioInput"
                    type="radio"
                    name="trainer"
                    value="Trainer"
                    onChange={() => handleInputChange(index, "Trainer")}
                  />
                  Trainer
                  <CommonInput
                    className="radioInput"
                    name="trainer"
                    type="radio"
                    value="Personal Trainer"
                    onChange={() => handleInputChange(index, "Personal Trainer")}
                  />
                  Personal Trainer
                </div>
              ) : (
                <SelectInput
                  key={index}
                  placeholder={value.placeholder}
                  data={value.data}
                  onChange={(selectedValue) => handleInputChange(index, selectedValue)}
                />
              )}
            </React.Fragment>
          ))}
          <CommonButton className="Registerbtn" label="Register" onClick={handleSubmit} />
        </div>
        <div className="TakeImage">
          <div className="imgcontainer">
            {showPhoto ? (
              <img src={photos} alt="Captured" />
            ) : (
              <TbCaptureFilled onClick={() => setShowPhoto(true)} />
            )}
          </div>
          <TakePhoto
            ViewImage={setShowPhoto}
            onImageCapture={handlePhotoChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
