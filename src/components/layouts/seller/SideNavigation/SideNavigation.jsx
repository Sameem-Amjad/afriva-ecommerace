"use client";
import {
  homeIcon,
  homeIconInactive,
  shoppingBagIcon,
  shoppingBagInactiveIcon,
  productsIcon,
  productsInactiveIcon,
  settingsIcon,
  settingsInactiveIcon,
  orderReturnIcon,
  orderReturnInactiveIcon,
  crossIcon,
} from "@/svgs";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const menuItemsData = [
  {
    id: "dashboard",
    name: "Dashboard",
    href: "/seller",
    activeSvg: homeIcon,
    inactiveSvg: homeIconInactive,
  },
  {
    id: "orders",
    name: "Orders",
    href: "/seller/orders",
    activeSvg: shoppingBagIcon,
    inactiveSvg: shoppingBagInactiveIcon,
  },
  {
    id: "products",
    name: "Products",
    href: "/seller/products",
    activeSvg: productsIcon,
    inactiveSvg: productsInactiveIcon,
  },
  {
    id: "orderReturn",
    name: "Order Return",
    href: "/seller/order-return",
    activeSvg: orderReturnIcon,
    inactiveSvg: orderReturnInactiveIcon,
  },
  {
    id: "settings",
    name: "Settings",
    href: "/seller/settings",
    activeSvg: settingsIcon,
    inactiveSvg: settingsInactiveIcon,
  },
];

const Navbar = ({ toggleNavbar, isNavbarOpen }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activePage, setActivePage] = useState("Dashboard");
  const [isClient, setIsClient] = useState(false); // Client-only flag to prevent hydration mismatch

  // Set the `isClient` flag to true after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Use useEffect to manage the body overflow for mobile screens

  const handleLinkClick = (page) => {
    setActivePage(page);

    // Check if the screen width is less than 768px (mobile) and close the drawer
    if (window.innerWidth < 768) {
      toggleNavbar(); // Close the drawer only on mobile
    }
  };

  // Only render the navbar on the client-side to avoid hydration mismatch
  if (!isClient) {
    return null;
  }

  return (
    <>
      <div
        className={`fixed md:sticky bottom-0 z-50 bg-[#FEFFFD] md:translate-x-0 top-0 left-0 flex flex-col space-y-16 pt-6 w-[60vw] sm:w-[40vw] lg:w-[30vw] xl:w-[20vw] ${
          isNavbarOpen ? "-translate-x-full" : "translate-x-0"
        } text-white bg-navbar-gradient h-[100vh] transition-transform duration-300 shadow-buttonShadow`}
      >
        <div className="mx-5 md:mx-0 items-center flex md:block flex-row justify-between">
          <div className="flex text-center lg:mx-5 mx-2 text-[36px] font-bold justify-between">
            <Image
              width={100}
              height={100}
              className="h-auto  cursor-pointer"
              src="/images/logo.png"
              alt="Logo"
            />

            <button onClick={toggleNavbar} className="block md:hidden">
              {crossIcon}
            </button>
          </div>
        </div>

        <ul className="flex flex-col gap-5 list-none text-left mx-5">
          {menuItemsData.map(({ name, href, activeSvg, inactiveSvg }) => (
            <Link
              key={name}
              href={href}
              className={`lg:text-[1rem] font-semibold flex text-grayDark flex-col gap-10 leading-6 transition-all rounded-md pt-3 pb-3 pl-4 pr-4 ${
                activePage === name
                  ? "text-primary bg-greenSideMenu"
                  : "hover:bg-greenSideMenu hover:text-primary"
              }`}
              onMouseEnter={() => setHoveredItem(name)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleLinkClick(name)}
            >
              <div className="flex items-center gap-3 text-[1rem]">
                <div>{activePage === name ? activeSvg : inactiveSvg}</div>
                <div>{name}</div>
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
