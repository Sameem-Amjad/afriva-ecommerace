"use client"
import Breadcrumb from "@/components/layouts/product/Breadcrumb";
import OtherDetails from "@/components/layouts/product/OtherDetails";
import ProductWrapper from "@/components/layouts/product/ProductWrapper";
import { fetchGetProductDetailsById } from "@/redux/features/products/productsThunk";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import dynamic from "next/dynamic";
const Loader = dynamic(() => import("@/components/Loader/Loader"), { ssr: false });
const Page = ({ params }) => {
  const { slug } = React.use(params);
  const dispatch = useDispatch();
  const { productDetails, productDetailLoading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchGetProductDetailsById(slug));
  }, [slug, dispatch]);

  return (
    <div className="flex flex-col">
      {
        productDetailLoading ? (

          <Loader />

        ) : (
          <div className="pt-28 lg:px-[100px] md:px-8 px-4 w-full flex flex-col">
            <Breadcrumb category={productDetails?.subcategory?.[0]} />

            <ProductWrapper product={productDetails} />

            <OtherDetails detail={productDetails?.description} id={productDetails?.id} />
          </div>
        )
      }
    </div>
  );
};

export default Page;
