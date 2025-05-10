"use client";
import React, { useState, useEffect } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import {
  paymentMethodInActiveIcon,
  shoppingBagIcon,
  shoppingBagInactiveIcon,
  paymentMethodIcon,
  profileIcon,
  profileInactiveIcon,
} from "@/svgs";
import Settings from "@/components/sections/buyer/profile";
import PaymentAndTrasaction from "@/components/sections/buyer/payment-method";
import Orders from "@/components/sections/buyer/orders";



const tabs = [
  {
    id: "settings",
    name: "Settings",
    component: <Settings />,
    icon: profileInactiveIcon,
    selectedIcon: profileIcon,
  },
  {
    id: "orders",
    name: "My Orders",
    component: <Orders />,
    icon: shoppingBagInactiveIcon,
    selectedIcon: shoppingBagIcon,
  },
  {
    id: "paymentMethod",
    name: "Payment Method",
    component: <PaymentAndTrasaction />,
    icon: paymentMethodInActiveIcon,
    selectedIcon: paymentMethodIcon,
  },
];

const Page = () => {
  const [hoveredItem, setHoveredItem] = useState(null);


  return (
    <div className="flex w-full flex-col">
      <div className="h-[120px] w-full"></div>

      <div className="flex h-auto w-full flex-col gap-y-10 overflow-visible px-5 pb-10 pt-12 lg:px-20">
        <div className="flex items-center gap-[20px]">
          <h1 className="my-2 text-4xl font-bold">My Profile</h1>
        </div>
        <div className="w-full">
          <TabGroup className="flex flex-col gap-[25px] md:flex-row">
            <TabList className="flex w-[270px] flex-col gap-4">
              {tabs.map(({ name, icon, selectedIcon }) => (
                <Tab
                  key={name}
                  className={({ selected }) =>
                    `lg:text-[1rem] font-semibold flex outline-none text-grayDark flex-col gap-10 leading-6 transition-all rounded-md pt-3 pb-3 pl-4 pr-4 ${selected
                      ? "text-primary bg-greenSideMenu"
                      : "hover:bg-greenSideMenu hover:text-primary"
                    }`
                  }
                  onMouseEnter={() => setHoveredItem(name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {({ selected }) => (
                    <div className="flex items-center gap-3 text-[1rem]">
                      <div>{selected ? selectedIcon : icon}</div>
                      <div>{name}</div>
                    </div>
                  )}
                </Tab>
              ))}
            </TabList>
            <TabPanels className="w-full">
              {tabs.map(({ component }, index) => (
                <TabPanel key={index}>{component}</TabPanel>
              ))}
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </div>
  );
};

export default Page;
