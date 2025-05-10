"use client";
import { decreaseIcon, increaseIcon } from "@/utils/Svgs";
import React from "react";

const Quantity = ({ quantity, setQuantity, maxQuantity }) => {
  return (
    <div className="flex flex-row py-3.5 px-5 rounded-full bg-searchBarBg lg:w-[25%] sm:w-[30%] w-[38%] gap-x-2 flex-nowrap justify-between items-center">
      <div
        onClick={() => {
          if (quantity > 1) {
            setQuantity(quantity - 1);
          }
        }}
        className="cursor-pointer w-[18px] h-[18px] justify-center items-center flex"
      >
        {decreaseIcon}
      </div>

      <p className="text-[18px] font-medium">{quantity}</p>

      <div
        onClick={() => {
          if (quantity < maxQuantity) {
            setQuantity(quantity + 1);
          }
        }}
        className="cursor-pointer w-[18px] h-[18px] justify-center items-center flex"
      >
        {increaseIcon}
      </div>
    </div>
  );
};

export default Quantity;
