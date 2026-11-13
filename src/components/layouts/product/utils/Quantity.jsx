"use client";
import { decreaseIcon, increaseIcon } from "@/utils/Svgs";
import React from "react";

const Quantity = ({ quantity, setQuantity, maxQuantity }) => {
  return (
    <div className="flex flex-row py-3.5 px-5 rounded-full bg-searchBarBg lg:w-[25%] sm:w-[30%] w-[38%] gap-x-2 flex-nowrap justify-between items-center">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => {
          if (quantity > 1) {
            setQuantity(quantity - 1);
          }
        }}
        className="cursor-pointer w-[18px] h-[18px] justify-center items-center flex"
      >
        {decreaseIcon}
      </button>

      <p className="text-[18px] font-medium" aria-live="polite" aria-label={`Quantity ${quantity}`}>{quantity}</p>

      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => {
          if (quantity < maxQuantity) {
            setQuantity(quantity + 1);
          }
        }}
        className="cursor-pointer w-[18px] h-[18px] justify-center items-center flex"
      >
        {increaseIcon}
      </button>
    </div>
  );
};

export default Quantity;
