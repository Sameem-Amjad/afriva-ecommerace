"use client";
import React, { useEffect } from "react";
import Tabs from "./utils/Tabs";
import DetailTab from "./utils/DetailTab";
import ReviewTab from "./utils/ReviewTab";
import ReturnTab from "./utils/ReturnTab";
import ProductsWrappers from "../homepage/ProductsWrappers";
import { fetchGetSimillarProducts } from "@/redux/features/products/productsThunk";
import { useDispatch, useSelector } from "react-redux";

const OtherDetails = ({ detail, id }) => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const dispatch = useDispatch();
  const { simillarProducts, simillarProductsLoading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchGetSimillarProducts(id));
  }, [id, dispatch]);
  return (
    <div className="w-full sm:mt-20 mt-12">
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {selectedTab === 0 && <DetailTab detail={detail} />}

      {selectedTab === 1 && <ReviewTab id={id} />}

      {selectedTab === 2 && <ReturnTab />}

      <ProductsWrappers
        title={"You might also like"}
        viewAll={false}
        products={simillarProducts}
      />
    </div>
  );
};

export default OtherDetails;
