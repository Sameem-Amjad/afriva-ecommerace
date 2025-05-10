"use client";
import { searchIcon } from "@/utils/Svgs";
import { useDispatch } from "react-redux";

import { fetchSearchProducts } from "@/redux/features/products/productsThunk";

const NavSearchBar = ({ search, setSearch }) => {
  const dispatch = useDispatch();

  return (
    <div className="sm:flex flex-row bg-searchBarBg rounded-[62px] px-4 py-3 w-full hidden">
      {searchIcon}
      <input
        type="text"
        placeholder="Search for products..."
        className="bg-transparent outline-none border-none ml-3 w-full placeholder:text-black placeholder:text-opacity-40"
        onChange={(e) => { dispatch(fetchSearchProducts({ searchTerm: e.target.value, start: 0, limit: 10 })); setSearch(e.target.value); }}
      />

    </div >
  );
};

export default NavSearchBar;
