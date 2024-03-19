import React, { useEffect, useState } from 'react';
import "./Quotation.css";
import Paragraph from '../../Common/Paragraph/Paragraph';
import Table1 from '../../Common/Table/Table';
import BelowTableButton from '../../Common/BelowTableButton/BelowTableButton';
import Button from '../../Common/Submit/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { Path } from '../../Routes/Path';
import axios from 'axios';
import { EndPoint } from '../../EndPoints/EndPoint';

const CustomerQuotationEdit = ({ location }) => {
  const { i } = useParams();
  console.log(i);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const Navigate = useNavigate();
  const [detail, setDetail] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${EndPoint}/Quotation`);
        setDetail(response.data[i])
        const CurrentData=response.data[i].Products
        const filteredData = CurrentData.map((item, index) => ({
          SNO: index+1,
          productName: item.productName,
          productRate: item.productRate
        }));
        setFilteredData(filteredData);
        setLoaded(true);
      
      } catch (error) {
        console.error("Error fetching data:", error);
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
    try {
      await axios.put(`${EndPoint}/Quotation/${detail.id}`, {
        ...detail,
        Products: filteredData
      });
      Navigate(Path.quotation);
    } catch (error) {
      console.error("Error updating quotation:", error);
    }
  }

  return (
    <div className='CustomerQuotationTable-Main-Division'>
      <div className='CustomerQuotationTable-Date-Name-paragraph'>
        <Paragraph value={`Date : ${detail ? formatDate(detail.Date): ""}`} className='CustomerQuotationTable-Paragraph' />
        <Paragraph value={`Customer Name : ${detail ? detail.CustomerName : ""}`} className='CustomerQuotationTable-Paragraph' />
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

export default CustomerQuotationEdit;
