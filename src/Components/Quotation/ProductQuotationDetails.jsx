import React, { useEffect, useState } from 'react';
import ReportsTable from '../ReportsComponent/ReportsTable';
// import { Quotation } from './QuotationDeteils'
import ReportsHeadSearchComp from '../ReportsComponent/ReportsHeadSearchComp';
import "./Quotation.css";
import Paragraph from '../../Common/Paragraph/Paragraph';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { SearchFuntion } from '../../Common/SearchBar/SearchFuction';
import { Path } from '../../Routes/Path';
import BreadCrumbs from '../../Common/BreadCrums/BreadCrumbs';
import { EndPoint } from '../../EndPoints/EndPoint';

const formatDate = (dateString) => {

  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const ProductQuotationDetails = () => {
  const [filtered, setFiltered] = useState([]);
  const [Quotation, setQuotation] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const Navigate=useNavigate()

  const { i } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${EndPoint}/Quotation`);
        const selectedData = response.data[i];

        setFiltered(selectedData);
        // console.log(selectedData); 
        // console.log(selectedData.Products); 

        const filteredQuotation = selectedData.Products.filter(product => product.productRate !== "").map((product, index) => ({
          SNo: index + 1, ...product 
        }));
        
        setOriginalData(filteredQuotation);
        setFilteredData(filteredQuotation);
        // console.log(filteredQuotation);
        setLoaded(true);
      } catch (error) {
        console.error("Error fetching notes data:", error);
      }
    };  
    fetchData();
  }, [i]);

  const HandleNavigate=()=>{
    Navigate(Path.quotationGoTable);
  }

  const HandleNavigateQuotation=()=>{
    Navigate(Path.quotation);
  }

  return (
    <div >
      <div>
      <BreadCrumbs  
       onClick={HandleNavigateQuotation}
       BreadCrumbsvalue={"Quotation >"}/>

      <BreadCrumbs  
       onClick={HandleNavigate} 
       BreadCrumbsvalue={"Quotation Table"}/>

      <BreadCrumbs  
       BreadCrumbsvalue={"> Product Quotation"}/>
      </div>

      <div className='formatDate-Main-division'>


      <ReportsHeadSearchComp
        addIcon={true}
       onChange={(e)=>SearchFuntion(e,originalData,setFilteredData)}
       originalData={originalData}
       setFilteredData={setFilteredData}
      />
      <div className='CustomerQuotationTable-Date-Name-paragraph-two'>
        <Paragraph
          value={`Date : ${filtered ? formatDate(filtered.Date) : ""}`}
          className='CustomerQuotationTable-Paragraph-two' />

        <Paragraph
          value={`Customer Name : ${filtered ? filtered.CustomerName : ""}`}
          className='CustomerQuotationTable-Paragraph-two' />
      </div>
      {
        loaded && filteredData.length !== 0 ?
        <ReportsTable SupplierReportsTableArr={filteredData} />:
        <h5>Empty Quotation...</h5  >
      }
      
    </div>
    </div>
  );
};

export default ProductQuotationDetails;
