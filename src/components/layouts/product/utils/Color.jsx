import { selectColorIcon } from "@/utils/Svgs";
import React from "react";

const Color = ({ color, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`w-9 h-9 rounded-full flex justify-center items-center cursor-pointer ${color === "white" || `#${color}` === "#ffffff"
        ? "border border-black text-black"
        : "text-white"
        }`}
      style={{ backgroundColor: color.startsWith("#") ? color : `#${color}` }}
    >
      {selected && selectColorIcon}
    </div>
  );
};

export default Color;
