"use client"
import RoundedButton from "@/components/buttons/RoundedButton";
import BrandWrapper from "@/components/layouts/brands/BrandWrapper";
import Browse from "@/components/layouts/homepage/Browse";
import { fetchGetProductsWithBrandDetails } from "@/redux/features/products/productsThunk";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const Page = () => {
  const dispatch = useDispatch();
  const { productsWithBrandDetails, loading, error, hasMore } = useSelector(state => state.products);
  const [start, setStart] = useState(0);


  useEffect(() => {
    dispatch(fetchGetProductsWithBrandDetails({ start, limit: 5 }));
  }
    , [dispatch, start]);

  return (
    <div className="pt-28 w-full flex flex-col">
      <div className="lg:px-[100px] md:px-8 px-4 flex flex-col items-center w-full">
        <div className="flex justify-center w-full sm:pb-16 pb-8">
          <h1 className="text-[40px] font-bold">Brands</h1>
        </div>
        {
          productsWithBrandDetails?.map((brand, index) => (
            <BrandWrapper
              key={index}
              brand={brand}
            />
          ))
        }

        <RoundedButton
          label="Load More Brands"
          onClick={() => {
            if (hasMore == true) {
              setStart((prev) => prev + 5)
            } else {
              toast.error("No more brands to load")
              return
            }
          }}
          className="py-4 bg-white text- border-black border-opacity-10 sm:w-[218px] w-full sm:mt-16 mt-8"
        />
      </div>
      <Browse />
    </div>
  );
};

export default Page;
