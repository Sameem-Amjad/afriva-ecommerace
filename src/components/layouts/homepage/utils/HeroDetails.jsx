"use client";
import RoundedButton from "@/components/buttons/RoundedButton";
import React, { useEffect } from "react";
import { fetchHomeData } from "@/redux/features/home/homeThunk";
import { useDispatch, useSelector } from "react-redux";
const HeroDetails = () => {
  const dispatch = useDispatch();
  const { homeData } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchHomeData());
  }
    , [dispatch]);
  return (
    <div className="flex flex-col w-full md:w-[50%] h-full sm:justify-center justify-start sm:gap-y-10 gap-y-6">
      <div className="flex flex-col sm:gap-y-6 gap-5">
        <h1 className="sm:text-6xl text-5xl font-bold ">
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </h1>
        <p className="opacity-60">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>
      </div>
      <div className="sm:w-[210px] w-full">
        <RoundedButton label="Shop Now" className="py-4 text-white bg-primary border-primary" />
      </div>

      <div className="flex flex-row w-full md:gap-x-8 gap-x-6 gap-y-5 flex-wrap md:justify-start justify-center">

        <div className="flex flex-col h-auto" >
          <h2 className="sm:text-[40px] text-4xl font-bold">
            {homeData?.totalBrands || 0}+
          </h2>
          <p className="opacity-60">International Brands</p>
        </div>

        <div className="flex flex-col h-auto" >
          <h2 className="sm:text-[40px] text-4xl font-bold">
            {homeData?.totalProducts || 0}+
          </h2>
          <p className="opacity-60">High-Quality Products</p>
        </div>

        <div className="flex flex-col h-auto" >
          <h2 className="sm:text-[40px] text-4xl font-bold">
            {homeData?.totalReviews || 0}+
          </h2>
          <p className="opacity-60">Happy Customers</p>
        </div>

      </div>
    </div>
  );
};

export default HeroDetails;
