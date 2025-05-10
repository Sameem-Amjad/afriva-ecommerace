"use client";
import React from "react";
import Size from "../../product/utils/Size";
import { catNextIcon } from "@/utils/Svgs";
import { setFilters } from "@/redux/features/filters/filterSlice";
import { useDispatch, useSelector } from "react-redux";
// remove with the api data of the product
const sizes = [{ size: "XS", vlaue: "X-Small " },
{ size: "S", vlaue: "Small" }, { size: "M", vlaue: "Medium" }, { size: "L", vlaue: "Large" }, { size: "XL", vlaue: "X-Large" }, { size: "XXL", vlaue: "XX-Large" }];
const SizeFilter = () => {
  const [show, setShow] = React.useState(true);
  const { filters } = useSelector((state) => state.filters);
  const [selected, setSelected] = React.useState(filters.size || sizes[0]?.vlaue);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col w-full sm:gap-y-5 gap-y-4 sm:mt-6 mt-4 sm:pb-6 pb-4 border-b border-b-black border-opacity-10">
      <div
        onClick={() => setShow(!show)}
        className="flex flex-row w-full justify-between cursor-pointer"
      >
        <p className="font-bold text-xl">Size</p>

        <div className="transform -rotate-90">{catNextIcon}</div>
      </div>
      {show && (
        <div className="flex flex-row sm:gap-4 gap-3 flex-wrap">
          {sizes.map((size, index) => (
            <div
              key={index}
              onClick={() => { setSelected(size?.vlaue); dispatch(setFilters({ size: size?.size })); }}
              className={`flex justify-center items-center sm:px-5 px-4 sm:py-2.5 py-2 rounded-full transition-all duration-300 ease-in-out cursor-pointer ${selected === size?.vlaue
                ? "bg-brandsbg text-white"
                : "bg-searchBarBg text-black text-opacity-60"
                }`}
            >
              <p>{size?.vlaue}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SizeFilter;
