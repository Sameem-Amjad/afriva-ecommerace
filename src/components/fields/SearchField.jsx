"use client";
import { searchIcon } from "@/svgs";
import React, { useState } from "react";

const SearchField = ({ placeholder, setSearchTerm }) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setSearchTerm(value);
  };

  return (
    <div className="flex w-full flex-row items-center gap-x-1 rounded-md border border-fieldBorder bg-transparent px-4 py-3 text-xs text-text placeholder:text-fieldBorder md:w-[250px]">
      {searchIcon}
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={handleSearchChange}
        className="w-full bg-transparent focus:outline-none pl-2"
      />
    </div>
  );
};

export default SearchField;
