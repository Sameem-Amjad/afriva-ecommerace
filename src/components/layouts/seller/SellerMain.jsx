"use client";
import React from "react";
import { useState } from "react";
import AdminHeader from "./Header/Header";
import AdminNavigation from "./SideNavigation/SideNavigation";

const SellerMain = ({ children }) => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div className="flex">
      <AdminNavigation
        isNavbarOpen={isNavbarOpen}
        toggleNavbar={toggleNavbar}
      />

      <div
        className={`flex flex-col webkit-fill-available  transition-transform duration-300 ${
          "w-webkit-fill-available w-full md:w-[70%] lg:w-[80%]"
          // : "ml-0"
        } `}
      >
        <AdminHeader toggleNavbar={toggleNavbar} />
        {children}
      </div>
    </div>
  );
};

export default SellerMain;
