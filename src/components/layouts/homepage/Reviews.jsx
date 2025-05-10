"use client";
import { backArrowIcon, forwardArrowIcon } from "@/utils/Svgs";
import React from "react";
import ReviewsSlider from "./utils/ReviewsSlider";

const Reviews = () => {
  const sliderRef = React.useRef(null);

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div className="flex flex-col gap-y-10 mt-20">
      <div className="w-full flex flex-row justify-between gap-x-3 flex-nowrap items-end lg:px-[100px] md:px-8 px-4">
        <h2 className="font-bold text-5xl">OUR HAPPY CUSTOMERS</h2>

        <div className="flex flex-row gap-x-5">
          <div
            onClick={previous}
            className="cursor-pointer p-1 hover:opacity-60 transition-opacity duration-300 ease-in"
          >
            {backArrowIcon}
          </div>
          <div
            onClick={next}
            className="cursor-pointer p-1 hover:opacity-60 transition-opacity duration-300 ease-in"
          >
            {forwardArrowIcon}
          </div>
        </div>
      </div>

      <ReviewsSlider sliderRef={sliderRef} />
    </div>
  );
};

export default Reviews;
