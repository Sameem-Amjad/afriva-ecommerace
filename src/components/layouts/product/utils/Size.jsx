import React from "react";

const Size = ({ size, selected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={!!selected}
      className={`flex justify-center items-center px-6 py-3 rounded-full transition-all duration-300 ease-in-out cursor-pointer ${
        selected
          ? "bg-brandsbg text-white"
          : "bg-searchBarBg text-black text-opacity-60"
      }`}
    >
      <span>{size}</span>
    </button>
  );
};

export default Size;
