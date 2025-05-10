"use client";
import { catNextIcon, filterIcon } from "@/utils/Svgs";
import { Slider } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import ClothesFilter from "./utils/ClothesFilter";
import PriceFilter from "./utils/PriceFilter";
import ColorsFilter from "./utils/ColorsFilter";
import SizeFilter from "./utils/SizeFilter";
import StyleFilter from "./utils/StyleFilter";
import RoundedButton from "@/components/buttons/RoundedButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchColorsByCategory, fetchPriceRangeByCategory, fetchSubCategories, fetchFilteredProducts } from "@/redux/features/filters/filterThunk";
import { toast } from "sonner";

const Filters = ({ category }) => {

  const dispatch = useDispatch();
  const { subCategories, priceRange, colors, filters } = useSelector((state) => state.filters);
  const [value, setValue] = React.useState([(priceRange[0] + 20), (priceRange[1] - 20)]);
  useEffect(() => {
    dispatch(fetchSubCategories(category));
    dispatch(fetchPriceRangeByCategory(category));
    dispatch(fetchColorsByCategory(category));
  }, [category, dispatch]);

  return (
    <div className="flex-col w-[295px] sm:flex hidden py-5 px-6 border border-black border-opacity-10 rounded-[20px]">
      <div className="flex flex-row w-full justify-between pb-6 border-b border-b-black border-opacity-10">
        <p className="font-bold text-xl">Filters</p>

        {filterIcon}
      </div>

      <ClothesFilter clothes={subCategories} />

      <PriceFilter value={value} setValue={setValue} priceRange={priceRange} />

      <ColorsFilter colors={colors} />

      <SizeFilter />

      {/* <StyleFilter /> */}

      <RoundedButton
        label="Apply Filter"
        onClick={() => {
          if (filters.subCategory || filters.color || filters.size || filters.sortBy) {
            dispatch(fetchFilteredProducts({ filters, page: 1, limit: 10 }));
          }
          else {
            toast.error("Please select a filter");
            return;
          }
        }}
        className=" bg-primary border-primary text-white font-medium w-full px-6 py-3.5"
      />
    </div>
  );
};

export default Filters;
