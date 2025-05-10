"use client";
import { productTabs } from "@/utils/Constants";
import React from "react";

const Tabs = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="w-full flex flex-row justify-between border-b border-b-black border-opacity-10">
      {productTabs.map((tab, index) => (
        <div
          key={index}
          onClick={() => setSelectedTab(index)}
          className={`w-fit cursor-pointer lg:px-20 md:px-8 px-0 ${
            selectedTab === index
              ? "border-b-2 border-black"
              : "border-b-2 border-transparent"
          } py-2 px-4 text-sm font-semibold`}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
