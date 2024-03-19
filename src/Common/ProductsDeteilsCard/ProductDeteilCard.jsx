import React, { useEffect, useState } from "react";
import "./ProductDeteilsCard.css";
import Paragraph from "../Paragraph/Paragraph";
import Deteils from "../ProductsDeteilsCard/Deteils";
import OptionButton from "../OptionButton/OptionButton.jsx";
import { FaRegEdit } from "react-icons/fa";
import { DummyArray } from "./DummyArray";
import Tomato from '../../assets/ProductDeteils/tomato.png'

const ProductDeteilCard = ({image,productName,keyvalue,pricePerStock,pricePerQuantity,pricePerUnit,totalStock,totalQuantity,totalUnit,availableStock,availableQuantity,availableUnit,}) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [edit, setEdit] = useState(true);
  const [Detetil, setDetetil] = useState(DummyArray);

  // console.log(Detetil);

  const totalQuantityChange = (event) => {
    const TempArray = [...DummyArray];
    const totalQuantity = event.target.value;
    TempArray[keyvalue].totalQuantity = totalQuantity;
    setDetetil(TempArray);
  };

  const availableQuantityChange = (event) => {
    const TempArray = [...DummyArray];
    const availableQuantity = event.target.value;
    TempArray[keyvalue].availableQuantity = availableQuantity;
    setDetetil(TempArray);
  };

  const pricePerStockChange = (event) => {
    const TempArray = [...DummyArray];
    const pricePerStock = event.target.value;
    TempArray[keyvalue].pricePerQuantity = pricePerStock;
    setDetetil(TempArray);
  };

  const handleMouseOver = () => {
    setHovered(true);
  };

  const handleMouseOut = () => {
    setHovered(false);
  };

  const handleClick = () => {
    setClicked(!clicked);
    setHovered(false);
  };

  const handleEditButtonClick = (event) => {
    event.stopPropagation();
    setEdit(!edit);
  };

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleClick}
      style={{ backgroundImage: `url(${image})` }}
      className={
        clicked || hovered
          ? "ProductDeteilCard-main-div-hovered"
          : "ProductDeteilCard-main-div"
      }
    >
      <div className="ProductDeteilCard-hover-div">
        <div className="ProductDeteilCard-vegitable-name-div">
          <Paragraph
            value={productName}
            className={
              clicked || hovered
                ? "ProductDeteilCard-vegitable-name-hoverd"
                : "ProductDeteilCard-vegitable-name"
            }
          />

          <div className="ProductDeteilCard-OptionButton-icon-div">
            {(hovered || clicked) && (
              <OptionButton
                onClick={handleEditButtonClick}
                className="ProductDeteilCard-OptionButton-icon"
                icon={<FaRegEdit />}
              />
            )}
          </div>
        </div>
        <div className="ProductDeteilCard-Array-div">
          <Deteils
            Stock={totalStock}
            onChange={totalQuantityChange}
            defaultValue={totalQuantity}
            unit={totalUnit}
            disabled={edit}
            onClick={(event)=>{event.stopPropagation()}}
          />
        </div>

        <div className="ProductDeteilCard-Array-div">
          <Deteils
            Stock={availableStock}
            onChange={availableQuantityChange}
            defaultValue={availableQuantity}
            unit={availableUnit}
            disabled={edit}
            onClick={(event)=>{event.stopPropagation()}}
          />
        </div>

        <div className="ProductDeteilCard-Array-div">
          <Deteils
            Stock={pricePerStock}
            onChange={pricePerStockChange}
            defaultValue={pricePerQuantity}
            unit={pricePerUnit}
            disabled={edit}
            onClick={(event)=>{event.stopPropagation()}}
          />
        </div>
      </div>
    </div>
  );
};

ProductDeteilCard.defaultProps = {
  image: Tomato,
  productName : '---',
  keyvalue : 0,
  pricePerStock : 0,
  pricePerQuantity : 0,
  pricePerUnit : 0,
  totalStock : 0,
  totalQuantity : 0,
  totalUnit : 0,
  availableStock : 0,
  availableQuantity : 0,
  availableUnit : 0,
}

export default ProductDeteilCard;
