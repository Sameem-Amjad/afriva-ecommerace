"use client";
import ProductCard from "@/components/cards/ProductCard";
import React, { useEffect } from "react";
import ProductsSlider from "./utils/ProductsSlider";
import RoundedButton from "@/components/buttons/RoundedButton";
import { fetchNewArrivalProducts, fetchTopSellingsProducts } from "@/redux/features/home/homeThunk";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
const ProductsWrappers = ({ title, viewAll, products }) => {
  const dispatch = useDispatch();
  const { arrivalProducts } = useSelector((state) => state.home);
  const { topSellingProducts } = useSelector((state) => state.home);

  const router = useRouter();

  useEffect(() => {
    dispatch(fetchNewArrivalProducts());
    dispatch(fetchTopSellingsProducts());

  }
    , [dispatch]);

  return (
    <div className="w-full mt-[72px] flex flex-col gap-y-14 lg:px-[100px] md:px-8 px-4">
      <div className="w-full flex justify-center">
        <h1 className="font-bold text-5xl">{title}</h1>
      </div>

      <div className="hidden md:flex flex-row flex-wrap gap-x-1 lg:justify-between justify-start">

        {
          title === "NEW ARRIVALS" && (

            arrivalProducts?.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))
          )}
        {title === "TOP SELLING" && (
          topSellingProducts?.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))
        )}
        {
          title === "You might also like" && (
            products?.map((item, index) => (
              <ProductCard key={index} product={item} />
            ))
          )
        }
      </div>
      <div className="block md:hidden overflow-hidden">
        <ProductsSlider />
      </div>

      {viewAll && (
        <div className="w-full flex justify-center">
          <RoundedButton
            onClick={() => { router.push("/new-arrival") }}
            label="View All"
            className="py-4 bg-white text- border-black border-opacity-10 sm:w-[218px] w-full"
          />
        </div>
      )}
    </div>
  );
};

export default ProductsWrappers;
