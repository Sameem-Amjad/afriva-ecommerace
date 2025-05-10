"use client";
import { Field, Select } from "@headlessui/react";
import React from "react";
import ShowFilterButton from "./ShowFilterButton";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "@/redux/features/filters/filterSlice";

const Header = ({ openModal }) => {
  const [value, setValue] = React.useState("Latest");
  const dispatch = useDispatch();
  const { products, total, currentPage } = useSelector((state) => state.filters)
  return (
    <div className="flex flex-row items-center justify-between gap-1 flex-wrap w-full">
      <p className="font-bold text-3xl">Casual</p>

      <div className="flex flex-row items-center gap-x-3">
        <p className="opacity-60">Showing 1-10 of {`${total}`} Products</p>

        <div className="flex flex-row items-center gap-x-1">
          <p className="opacity-60">Sort by:</p>

          <Field>
            <Select
              onChange={(e) => { setValue(e.target.value); dispatch(setFilters({ sortBy: e.target.value })) }}
              value={value}
              className="block w-full text-black"
              name="Select Account Type"
            >
              <option value={"latest"}>Latest</option>
              <option value={"lowest"}>low to highest</option>
              <option value={"highest"} >highest to lowest</option>
              {/* <option>Option 3</option>
              <option>Option 3</option>
              <option>Option 3</option> */}
            </Select>
          </Field>
        </div>

        <ShowFilterButton openModal={openModal} />
      </div>
    </div>
  );
};

export default Header;
