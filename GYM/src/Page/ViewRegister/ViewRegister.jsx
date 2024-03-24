import React, { useEffect, useState } from 'react';
import CommonPara from '../../Common/Para/Para';
import "./ViewRegister.css";
import Sort from '../../Common/Sort/Sort';
import FilterButton from '../../Common/FilterButton/FilterButton';
import Search from '../../Common/Search/Search';
import { MdDelete } from "react-icons/md";
import OptionButton from '../../Common/OptionButton/OptionButton';
import { AiOutlineDownload } from "react-icons/ai";
import axios from 'axios'; 
import TableTwo from '../../Common/Table/TableTwo';
import { jsPDF } from 'jspdf';

const ViewRegister = () => {
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [originalData, setOriginalData] = useState([]); 
  const [filteredData, setFilteredData] = useState([]);
  const [Value, setValue] = useState({});
  const [Duplicate,setDuplicate]=useState()
  const [selectedRows, setSelectedRows] = useState([]);
  const [Validation ,setValidation] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/CustomerDetails");
        const modifiedData = response.data.map(obj => ({
          id:obj.id,
          Name: obj.Name,
          Age: obj.Age,
          Gender: obj.Gender,
          Contact: obj.Contact,
          City: obj.City,
          "Join Date": obj.JoiningDate,
          Duration: obj.Duration,
          "Expiry Date": calculateExpiryDate(obj.JoiningDate, obj.Duration),
          Type: obj.Type,
          Profile: obj.Profile
        }));

        setFilteredData(modifiedData);
        setOriginalData(modifiedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [Duplicate]);

  useEffect(() => {
    const selectedKeys = Object.keys(Value).filter(key => Value[key]);
    setSelectedRows(selectedKeys);
    setDuplicate(filteredData.filter((_, index) => selectedKeys.includes(index.toString())));
  }, [Value]);
  
  const calculateExpiryDate = (joiningDate, duration) => {
    if (!joiningDate) return ""; 
    const [month, day, year] = joiningDate.split('/');
    const months = parseInt(duration);
    const expiryDate = new Date(parseInt(year), parseInt(month) - 1 + months, parseInt(day));
    const formattedDay = expiryDate.getDate().toString().padStart(2, '0');
    const formattedMonth = (expiryDate.getMonth() + 1).toString().padStart(2, '0');
    const formattedYear = expiryDate.getFullYear();
    return `${formattedDay}/${formattedMonth}/${formattedYear}`;
  };


  const handleOptionButtonClick = async () => {
    setShowCheckbox(!showCheckbox);
    setValidation(!Validation)
    try {
      for (const rowIndex of selectedRows) {
        await axios.delete(`http://localhost:5000/CustomerDetails/${filteredData[rowIndex].id}`);
      }

      const response = await axios.get("http://localhost:5000/CustomerDetails");
      const modifiedData = response.data.map(obj => ({
        id: obj.id,
        Name: obj.Name,
        Age: obj.Age,
        Gender: obj.Gender,
        Contact: obj.Contact,
        City: obj.City,
        "Join Date": obj.JoiningDate,
        Duration: obj.Duration,
        "Expiry Date": calculateExpiryDate(obj.JoiningDate, obj.Duration),
        Type: obj.Type,
        Profile: obj.Profile
      }));
  
      setFilteredData(modifiedData);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  
  






  const handleSortClick = (index) => {
    if (index === 0) {
      const sortedData = filteredData.slice().sort((a, b) => a.Age - b.Age);
      setFilteredData(sortedData);
    } 
    else if (index === 1) {
      const sortedData = filteredData.slice().sort((a, b) => a.Name.localeCompare(b.Name));
      setFilteredData(sortedData);
    }
  };

  const handleDownloadButtonClick = () => {
    setValidation(!Validation)
    const tableContent = `
    
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th >Age</th>
            <th >Gender</th>
            <th >Contact</th>
            <th >City</th>
            <th >Join Date</th>
            <th >Duration</th>
            <th >Expiry Date</th>
            <th >Type</th>
            <th >Profile</th>
          </tr>
        </thead>
        <tbody>
          ${filteredData.map(data => `
            <tr>
              <td >${data.Name}</td>
              <td >${data.Age}</td>
              <td >${data.Gender}</td>
              <td >${data.Contact}</td>
              <td >${data.City}</td>
              <td >${data['Join Date']}</td>
              <td >${data.Duration}</td>
              <td >${data['Expiry Date']}</td>
              <td >${data.Type}</td>
              <td >${data.Profile}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    const pdf = new jsPDF({
      orientation: 'landscape'
    });
    pdf.html(tableContent, {
      callback: () => {
        pdf.save('filtered_data.pdf');
      }
    });
  };

  const handleCheckboxChange = (checked) => {
    setIsChecked(checked);
  };
  
  
  

  return (
    <div className='wholeViewRegister' >
      <div className='ViewRegister-top-division'>
        <CommonPara label="View Register" className="ViewRegister-CommonPara"/>
        <div className='ViewRegister-top-division-sub-division-two'>
          <Sort handleSortClick={handleSortClick} />
          <FilterButton originalData={originalData} setFilteredData={setFilteredData} />
          <Search originalData={originalData} setFilteredData={setFilteredData} />
        </div>
      </div>
      <div>
        <div className='ViewRegister-second-division'>
          {showCheckbox && (
            <input 
             type="checkbox" 
             className='ViewRegister-checkbox'
             checked={isChecked} 
             onChange={(e) => handleCheckboxChange(e.target.checked)}
             onClick={() => setIsChecked(!isChecked)} 
/>

          )}
          <OptionButton 
            icon={<MdDelete color='red' fontSize={"25px"}/>}
            onClick={handleOptionButtonClick}
          />
          <div className="ViewRegister-OptionButton-AiOutlineDownload">
            <OptionButton 
              onClick={handleDownloadButtonClick}
              icon={<AiOutlineDownload color='red' fontSize={"25px"}/>}
            />
          </div>
        </div>
      </div>
      <div>
        <TableTwo isChecked={isChecked} FilteredData={filteredData} setValue={setValue} Validation={Validation}/>
      </div>
    </div>
  );
}

export default ViewRegister;
