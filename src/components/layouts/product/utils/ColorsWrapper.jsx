"use client";
import React from "react";
import Color from "./Color";

// remove with the api data of the product
// const colors = ["#4F4631", "#314F4A", "#31344F"];
const ColorsWrapper = ({ colors, selectedColor, setSelectedColor }) => {
  return (
    <div className="flex flex-col my-6 py-6 gap-y-3.5 border-y border-y-black border-opacity-10">
      <p className="opacity-60">Select Colors</p>

      <div className="flex flex-row gap-4 flex-wrap">
        {colors.map((color, index) => (
          <Color
            onClick={() => setSelectedColor(color)}
            key={index}
            color={color}
            selected={selectedColor === color}
          />

        ))}
      </div>
    </div>
  );
};

export default ColorsWrapper;
