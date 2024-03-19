import React, { useContext, useEffect, useState } from 'react'
import { QuotationDeteils } from './QuotationDeteils';
import FormCard from '../../Common/FormCard/FormCard';
import NavButton from '../../Common/NavButton/NavButton';
import axios from 'axios';
import { Path } from '../../Routes/Path';
import { useNavigate, useParams } from 'react-router-dom';
import { EndPoint } from '../../EndPoints/EndPoint';
import MyContext from '../../Common/MyContext/MyContext';

const QuotationCard = ({ path, submitPath }) => {
  const { setQuotation } = useContext(MyContext);
  const [detail, setDetail] = useState([]);
  const [Navi, setNavi] = useState("true");
  const [id, setId] = useState();
  const Navigate = useNavigate();
  const { i } = useParams();

  const [data, setData] = useState({
    id: "",
    Date: "",
    CustomerName: "",
    PhoneNumber: "",
    Products: []
  });

  const NotesData = async () => {
    try {
      const response = await axios.get(`${EndPoint}/Quotation`);
      setDetail(response.data);

      if (i !== undefined && response.data[i]) {
        const currentData = response.data[i];
        setId(currentData.id);
        setData({
          ...data,
          id: currentData.id,
          Date: currentData.Date,
          CustomerName: currentData.CustomerName,
          PhoneNumber: currentData.PhoneNumber,
          Products: currentData.Products
        });
      }

    } catch (error) {
      console.error("Error fetching notes data:", error);
    }
  };

  useEffect(() => {
    NotesData();
    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    setData({
      ...data,
      Date: `${year}-${month > 9 ? month : `0${month}`}-${date > 9 ? date : `0${date}`}`
    });
  }, []); 

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onsubmitHandler = async (e) => {
    if (i !== undefined && i !== "") {
      const updateDataOnServer = async () => {
        try {
          await axios.put(`${EndPoint}/Quotation/${id}`, data);
        } catch (error) {
          console.error("Error updating note:", error);
        }
      };

      updateDataOnServer();
      Navigate(`${Path.quotationSubmitTable}/${i}`);
    } else {
      e.preventDefault();

      let maxId = 0;
      if (detail.length > 0) {
        maxId = Math.max(...detail.map((item) => parseInt(item.id)));
      }
      const newId = maxId === -Infinity ? 1 : maxId + 1;

      const newData = {
        id: newId.toString(),
        Date: data.Date,
        CustomerName: data.CustomerName,
        PhoneNumber: data.PhoneNumber,
        Products: ""
      };

      setQuotation(newData);

      await NotesData();

      setData({
        id: "",
        Date: "",
        CustomerName: "",
        PhoneNumber: ""
      });
      if (Navi === "true") {
        Navigate(Path.quotationSubmitTable);
        setNavi("false");
      }
    }
  };

  return (
    <FormCard
      Heading={"Quotation"}
      expenseDeteil={QuotationDeteils}
      path={path}
      NavigateButton={<NavButton value={"Go to Table"} className='FormCard-NavButton' path={path} />}
      BreadCrumbsvalue={"Quotation"}
      onChange={onChangeHandler}
      onsubmitHandler={onsubmitHandler}
      inpValue={data}
    />
  );
}

export default QuotationCard;
