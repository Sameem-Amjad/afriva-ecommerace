"use client";
import { setPromoCode } from "@/redux/features/promocode/promocodeSlice";
import { promoIcon } from "@/utils/Svgs";
import React from "react";
import { useDispatch } from "react-redux";

const PromoField = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row bg-searchBarBg items-center rounded-[62px] px-4 py-3 w-full">
      {promoIcon}
      <input
        type="text"
        onChange={(e) => dispatch(setPromoCode(e.target.value))}
        placeholder="Add promo code"
        className="bg-transparent outline-none border-none ml-3 w-full placeholder:text-black placeholder:text-opacity-40"
      />
    </div>
  );
};

export default PromoField;
