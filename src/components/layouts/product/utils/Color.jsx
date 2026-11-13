import { selectColorIcon } from "@/utils/Svgs";
import React from "react";

const Color = ({ color, name, selected, onClick }) => {
  const hex = color.startsWith("#") ? color : `#${color}`;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={name || hex}
      aria-pressed={!!selected}
      title={name || hex}
      className={`w-9 h-9 rounded-full flex justify-center items-center cursor-pointer ${color === "white" || hex.toLowerCase() === "#ffffff"
        ? "border border-black text-black"
        : "text-white"
        }`}
      style={{ backgroundColor: hex }}
    >
      {selected && selectColorIcon}
    </button>
  );
};

export default Color;
