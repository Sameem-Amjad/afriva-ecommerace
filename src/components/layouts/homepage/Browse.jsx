"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { fetchCategories } from "@/redux/features/categories/categoriesThunk";
import { useDispatch, useSelector } from "react-redux";

const Browse = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }
    , [dispatch]);

  return (
    <div className="lg:px-[100px] md:px-8 px-4 w-full mt-[80px]">
      <div className="w-full sm:py-[70px] py-10 sm:px-16 px-6  flex flex-col bg-searchBarBg rounded-[40px]">
        <div className="w-full flex justify-center sm:mb-16 mb-7">
          <h2 className="sm:text-[48px] text-2xl font-bold leading-normal">
            BROWSE BY CATEGTORIES
          </h2>
        </div>

        <div className="flex w-full flex-row flex-wrap gap-5">
          {categories?.map((category, index) => {
            const isEven = Math.floor(index / 2) % 2 === 0; // Check row number
            const isFirstInPair = index % 2 === 0;

            // Determine width based on row and position
            let widthClass = "";
            if (isEven) {
              widthClass = isFirstInPair ? "md:w-[39%]" : "md:w-[57%]";
            } else {
              widthClass = isFirstInPair ? "md:w-[57%]" : "md:w-[39%]";
            }

            return (
              <Link
                key={category?.category_id}
                href={`/category/${category?.category_name}`}
                className={`md:py-6 md:px-9 py-[18px] px-6 w-full ${widthClass} md:h-[289px] h-[190px] bg-center bg-no-repeat bg-cover rounded-[20px] hover:scale-[1.02] transition-all duration-300 ease-in-out`}
                style={{
                  backgroundImage: `url(${category?.category_image})`
                }}
              >
                <p className="text-4xl font-bold text-black drop-shadow-lg">{category?.category_name}</p>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Browse;
