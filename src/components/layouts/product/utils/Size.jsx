import React from "react";

const Size = ({ size, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex justify-center items-center px-6 py-3 rounded-full transition-all duration-300 ease-in-out cursor-pointer ${
        selected
          ? "bg-brandsbg text-white"
          : "bg-searchBarBg text-black text-opacity-60"
      }`}
    >
      <p>{size}</p>
    </div>
  );
};

export default Size;
