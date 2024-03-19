import React from "react";
import ProductDeteilCard from "./ProductDeteilCard";
import { DummyArray } from "./DummyArray";
const ProductDetailsIndex = () => {
  return (
    <div style={{display:"flex",flexWrap:"wrap",gap:"20px",justifyContent:"center"}}>
      {DummyArray && DummyArray.length > 0 ? DummyArray.map((Value, index) => (
        <div key={index}>
          <ProductDeteilCard
            key={index}
            image={Value.image}
            productName={Value.productName}
            pricePerStock={Value.pricePerStock}
            pricePerQuantity={Value.availableQuantity}
            pricePerUnit={Value.pricePerUnit}
            totalStock={Value.totalStock}
            totalQuantity={Value.totalQuantity}
            totalUnit={Value.totalUnit}
            availableStock={Value.availableStock}
            availableQuantity={Value.availableQuantity}
            availableUnit={Value.availableUnit}
            keyvalue={index}
          />
        </div>
      )): 'No Data to Display'}
    </div>
  );
};

export default ProductDetailsIndex;
