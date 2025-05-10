import React from "react";
import ProductImages from "./ProductImages";
import ProductDetails from "./ProductDetails";

const ProductWrapper = ({ product }) => {
  return (

    <div className="flex flex-row w-full flex-wrap mt-10 gap-x-6 justify-between gap-y-6">
      <ProductImages images={product?.product_image} />

      <ProductDetails product={product} />
    </div>


  );
};

export default ProductWrapper;
