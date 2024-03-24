import React, { useEffect, useState } from 'react';
import CommonButton from '../Button/Button';
import CommonPara from '../Para/Para';
import { initialOrders } from '../Data/Data';
import './ViewOrder.css'

const ViewOrder = ({ back, IndexNum }) => {
  const [Orders, setOrders] = useState(initialOrders[IndexNum]);

  useEffect(() => {
    setOrders(prevOrders => ({
      ...prevOrders,
      shippingDate: getRandomDate(),
      expectedDeliveryDate: getRandomDate(),
    }));
  }, []);

  const getRandomDate = () => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 10) + 2); 
    return endDate.toISOString().split('T')[0];
  };

  return (
    <div className="viewmoreContainer">
      <div className='viewContainer'>
      <div style={{textAlign:'center',marginBottom:'10px',fontWeight:'700'}}><CommonPara label='ORDERS DETAILS'/></div>
      <CommonPara label='Order ID : ' label2={Orders.orderId} />
      <CommonPara label='Customer Name : ' label2={Orders.customerName} />
      <CommonPara label='Order Date : ' label2={Orders.orderDate} />
      <CommonPara label='Status : ' label2={Orders.status} />
      <CommonPara label='Shipping Date : ' label2={`${Orders.shippingDate}`}/> 
      <CommonPara label='Expected Delivery Date : ' label2={`${Orders.expectedDeliveryDate}`} />
      <CommonButton className='clodebtn' label='Close details' onClick={() => back()} />
    </div>
    </div>
  );
};

export default ViewOrder;
