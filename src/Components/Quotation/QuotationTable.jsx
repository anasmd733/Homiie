import React, { useEffect, useState } from 'react' 
import TableCard from '../../Common/ExpenseTable/TableCard'
import OptionButton from '../../Common/OptionButton/OptionButton'
import { CiCirclePlus } from "react-icons/ci";
import axios from 'axios';
import { SearchFuntion } from '../../Common/SearchBar/SearchFuction';
import BreadCrumbs from '../../Common/BreadCrums/BreadCrumbs';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../Routes/Path';
import DeletePopUp from '../../Common/DeletePopUp/DeletePopUp';
import "./Quotation.css"
import { EndPoint } from '../../EndPoints/EndPoint';
const QuotationTable = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [Data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [door,setdoor]=useState(false)
  const [id,setid]=useState();
  
  const Navigate= useNavigate()
  const HandleNavigate=()=>{
    Navigate(Path.quotation)
  }

  const fetchData = async () => {
    try { 
      const response = await axios.get(`${EndPoint}/Quotation`);
      const filteredData = response.data.map((item,key) => ({
        SNo:key+1,
        Date: item.Date,  
        CustomerName: item.CustomerName,
        PhoneNumber:item.PhoneNumber
      }));
      setData(response.data)
      setOriginalData(filteredData);
      setFilteredData(filteredData);
      setLoaded(true);
    } catch (error) {
      console.error("Error fetching notes data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const Handle = (i) => {
    Navigate(`${Path.ProductQuotation}/${i}`);
   };

   const QuotationEditClick=(i)=>{
    Navigate(`${Path.quotation}/${i}`);
  }

  const DeleteClick=(i)=>{ 
    setid(i)
    setdoor(true)
  }
  const QuotationDeleteClick = async (index) => {
    try {
      const quotationIdToDelete = Data[index].id; 
      await axios.delete(`${EndPoint}/Quotation/${quotationIdToDelete}`);
      setdoor(false)
      fetchData();
    } 
    catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  
  const Delete=()=>{
    QuotationDeleteClick(id);
    setdoor(false)
  }

  const NewQuotation=()=>{
    Navigate(Path.quotation)
  }
  
  

  return (
    <> 
    <div>
    <div className={door === true ? 'main-div-blur-quotation' : null}>
      <BreadCrumbs onClick={HandleNavigate} BreadCrumbsvalue={"Quotation >"} />
      <BreadCrumbs  BreadCrumbsvalue={"Quotation Table"}/>
      {
      loaded ?
      <TableCard 
       onClick={Handle}
       TableWithAddArr={filteredData}  
       onChange={(e)=>SearchFuntion(e,originalData,setFilteredData)}
       circle={<OptionButton 
       iscricrle={true} 
       icon={<CiCirclePlus fontSize={"40px"}/>}/>}
       originalData={originalData}
       setFilteredData={setFilteredData}
       onEditClick={QuotationEditClick}
       onDeleteClick={(i)=>{DeleteClick(i)}}
       AddDetail={NewQuotation}
      />
      :
      <h1>Loading</h1>
      }
     </div>
      {
        door === true ?
        <DeletePopUp 
        className='DeletePopUp-division-Quotation'
        CancelonClick={() => setdoor(false)}
        DeleteonClick={() => Delete()}
         />
         : null
       }
      </div>

    </> 
  )
}

export default QuotationTable
