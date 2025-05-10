import React from "react";

const FilterButton = ({ onFilter }) => {
  return (
    <div className="flex gap-2">
      {[5, 4, 3, 2, 1].map((rating) => (
        <button
          key={rating}
          onClick={() => onFilter(rating)}
          className="w-12 h-12 rounded-full flex justify-center items-center bg-searchBarBg"
        >
          {rating}★
        </button>
      ))}
    </div>
  );
};

export default FilterButton;