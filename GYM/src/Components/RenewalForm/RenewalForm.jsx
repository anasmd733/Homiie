import React from "react";
import CommonPara from "../../Common/Para/Para";
import CommonInput from "../../Common/Input/Input";
import './RenewalForm.css'
import CommonButton from "../../Common/Button/Button";
import Select from "../../Common/Select/Select";

const RenewalForm = ({RenewalFormBack}) => {
  const data = [
    { name: "12 Months", code: "12" },
    { name: "6 Months", code: "6" },
    { name: "3 Months", code: "3" },
    { name: "2 Months", code: "2" },
    { name: "1 Month", code: "1" },
  ];
  return (
    <div className="RenewalFormContainer" >
      <div className="Duration">
        <CommonPara label="Duration" />
        <Select data={data}/>
      </div>
      <div className="JoinDate">
        <CommonPara label="Joining Date" />
        <CommonInput className='date' type="Date" />
      </div>
      <div className="ExpireDate">
        <CommonPara label="Expired Date" />
        <CommonInput className='date' type="Date" />
      </div>
     <div className="okayContainer">
     <CommonButton onClick={()=>RenewalFormBack()} className='okay' label='Okay'/>
     </div>
    </div>
  );
};

export default RenewalForm;
// import React, { useState } from 'react';
// import DropdownSelect from '../../Common/Select/Select';

// const ExampleComponent = () => {
//   const [selectedOption, setSelectedOption] = useState('');

//   const handleChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   const options = [
//     { label: 'Option 1', value: 'option1' },
//     { label: 'Option 2', value: 'option2' },
//     { label: 'Option 3', value: 'option3' },
//   ];

//   return (
//     <div>
//       <h1>Example Dropdown Select</h1>
//       <DropdownSelect label="Select an option"
//         options={options}
//         value={selectedOption}
//         onChange={handleChange}/>

//     </div>
//   );
// };

// export default ExampleComponent;
