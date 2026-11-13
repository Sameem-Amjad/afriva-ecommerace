"use client";
import { Field, Select } from "@headlessui/react";
import React from "react";
import ShowFilterButton from "./ShowFilterButton";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "@/redux/features/filters/filterSlice";

const Header = ({ openModal, title, perPage = 9 }) => {
  const [value, setValue] = React.useState("latest");
  const dispatch = useDispatch();
  const { products, total, currentPage } = useSelector((state) => state.filters)
  return (
    <div className="flex flex-row items-center justify-between gap-1 flex-wrap w-full">
      <h1 className="font-bold text-3xl">{title || "All products"}</h1>

      <div className="flex flex-row items-center gap-x-3">
        <p className="opacity-60">
          {total
            ? `Showing ${(currentPage - 1) * perPage + 1}-${(currentPage - 1) * perPage + (products?.length || 0)} of ${total} ${total === 1 ? "product" : "products"}`
            : "No products"}
        </p>

        <div className="flex flex-row items-center gap-x-1">
          <p className="opacity-60">Sort by:</p>

          <Field>
            <Select
              onChange={(e) => { setValue(e.target.value); dispatch(setFilters({ sortBy: e.target.value })) }}
              value={value}
              className="block w-full text-black"
              name="sort"
              aria-label="Sort products"
            >
              <option value={"latest"}>Latest</option>
              <option value={"lowest"}>Price: low to high</option>
              <option value={"highest"}>Price: high to low</option>
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
