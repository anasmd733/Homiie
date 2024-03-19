import React, { useEffect, useState } from "react";
import { dashBoardCardArray } from "./dashBoardArray";
import DashBoardCard from "../DashBoardCard/DashBoardCard";
import "./style.css";
import { Col, Container, Row } from "react-bootstrap";
// import dashBoardGroup from '../../../assets/Group 2124.png'
// import chess from '../../../assets/CompositeLayer (4).png'
// import house from '../../../assets/CompositeLayer (5).png'
// import cart from '../../../assets/CompositeLayer (6).png'

const DashBoardCardsParent = ({totalCustomer, totalSupplier, totalSalesAmount, totalPurchaseAmount, boxBalance}) => {
  const [dashContents, setDashContents] = useState(dashBoardCardArray.map(val=>val))
  useEffect(()=>{
    setDashContents(dashContents.map((val=>val.content=="Total Customers" ? {...val,heading : totalCustomer} : val.content == "Total Suppliers" ? {...val,heading:totalSupplier} : val.content == "Total Sales Amount" ? {...val,heading : totalSalesAmount} : val.content == "Total Purchase Amount" ? {...val,heading : totalPurchaseAmount } : val.content == "Total Products" ? {...val,heading:boxBalance} : val)))
    // console.log(totalSalesAmount);
  },[])
  return (
        <div>
          <Container fluid>
            <Row>
          {dashContents && dashContents.length > 0
            ? dashContents.map((card, i) => (
              <Col key={i} sm={12} md={6} lg={4} style={{marginBottom:'15px'}}>
                <DashBoardCard
                  img={card.image}
                  heading={card.heading}
                  content={card.content}
                />
              </Col>
              ))
            : "No Contents To Display"}
            </Row>
    </Container>
        </div>
      
  );
};

export default DashBoardCardsParent;
