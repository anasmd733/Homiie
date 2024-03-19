import React, { useContext, useEffect, useState } from 'react';
import "./Quotation.css";
import Paragraph from '../../Common/Paragraph/Paragraph';
import Table1 from '../../Common/Table/Table';
import BelowTableButton from '../../Common/BelowTableButton/BelowTableButton';
import Button from '../../Common/Submit/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../Routes/Path';
import { EndPoint } from '../../EndPoints/EndPoint';
import MyContext from '../../Common/MyContext/MyContext';

const CustomerQuotationTable = ({ location }) => {
  const Navigate = useNavigate();
  const { Quotation } = useContext(MyContext);
  const [filteredData, setFilteredData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${EndPoint}/productRegister`);
        const filteredData = response.data.map(item => ({
          productName: item.productName,
          productRate: item.productRate
        }));
        setFilteredData(filteredData);
        setLoaded(true);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);

  const handleProductRateChange = (index, newValue) => {
    const updatedData = [...filteredData];
    updatedData[index].productRate = newValue;
    setFilteredData(updatedData);
  };

  const HandleSave = async () => {
    const updatedProducts = filteredData.map(item => ({
      productName: item.productName,
      productRate: item.productRate
    }));
    
    try {
      await axios.put(`${EndPoint}/Quotation/${Quotation.id}`, {
        ...Quotation, 
        Products: updatedProducts 
      });
      
      Navigate(Path.quotation);
    } catch (error) {
      console.error("Error updating quotation:", error);
    }
  }
  
  return (
    <div className='CustomerQuotationTable-Main-Division'>
      <div className='CustomerQuotationTable-Date-Name-paragraph'>
        <Paragraph value={`Date : ${Quotation.Date}`} className='CustomerQuotationTable-Paragraph' />
        <Paragraph value={`Customer Name : ${Quotation.CustomerName}`} className='CustomerQuotationTable-Paragraph' />
      </div>

      {loaded ? 
        <Table1 
          tableDatas={filteredData} 
          showInputBox={true} 
          onProductRateChange={handleProductRateChange} /> :
        <h1>Loading</h1>
      }

      <div className='CustomerQuotationTable-Final-division'>
        <BelowTableButton 
          value={"Locate"} 
          className='CustomerQuotationTable-BelowTableButton'
          location={location} />

        <Button value={"Save"} className='CustomerQuotationTable-Save-Button' onClick={HandleSave} />
      </div>
    </div>
  );
}

export default CustomerQuotationTable;
