"use client";
import React from "react";
import Size from "../../product/utils/Size";
import { catNextIcon } from "@/utils/Svgs";

// remove with the api data of the product
const styles = ["Casual", "Formal", "Party", "Gym"];

const StyleFilter = () => {
  const [show, setShow] = React.useState(true);
  return (
    <div className="flex flex-col w-full sm:gap-y-5 gap-y-4 sm:mt-6 mt-4 sm:pb-6 pb-4">
      <div
        onClick={() => setShow(!show)}
        className="flex flex-row w-full justify-between cursor-pointer"
      >
        <p className="font-bold text-xl">Dress Style</p>

        <div className="transform -rotate-90">{catNextIcon}</div>
      </div>
      {show && (
        <div className="flex flex-col w-ful ms:gap-y-5 gap-y-3">
          {styles.map((style, index) => (
            <div
              key={index}
              className="flex flex-row w-full items-center cursor-pointer"
            >
              <p className="opacity-60">{style}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StyleFilter;
