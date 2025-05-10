"use client";
import { catNextIcon } from "@/utils/Svgs";
import { Slider } from "@mui/material";
import React from "react";
import { setFilters } from "@/redux/features/filters/filterSlice";
import { useDispatch } from "react-redux";
const PriceFilter = ({ value, setValue, priceRange }) => {
  const [showPrice, setShowPrice] = React.useState(true);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
    dispatch(setFilters(
      // (prevState) => (
      //   {
      //   ...prevState,
      //   priceRange: newValue,
      // })
      { priceRange: newValue }
    ));
  };
  return (
    <div className="flex flex-col w-full sm:gap-y-5 gap-y-4 sm:mt-6 mt-4 sm:pb-6 pb-4  border-b border-b-black border-opacity-10">
      <div
        onClick={() => setShowPrice(!showPrice)}
        className="flex flex-row w-full justify-between cursor-pointer"
      >
        <p className="font-bold text-xl">Price</p>

        <div className="transform -rotate-90">{catNextIcon}</div>
      </div>

      {showPrice && (
        <div className="flex flex-col sm:gap-y-3 gap-y-2">
          <Slider
            getAriaLabel={() => "Price range"}
            min={priceRange[0] || 0}
            max={priceRange[1] || 10000}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(val) => `$${val}`} // Adds the $ sign
            sx={{
              color: "#007aff", // This changes the main color of the slider
              "& .MuiSlider-thumb": {
                backgroundColor: "black", // Thumb color
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: "0px 0px 0px 8px rgba(0, 0, 0, 0.16)", // Custom hover/focus color
                },
                "&.Mui-active": {
                  boxShadow: "0px 0px 0px 8px rgba(0, 0, 0, 0.24)", // Custom active color when dragging
                },
              },
              "& .MuiSlider-rail": {
                color: "#F0F0F0", // Rail color
              },
              "& .MuiSlider-track": {
                color: "black", // Track color
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
