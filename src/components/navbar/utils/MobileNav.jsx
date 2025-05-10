import { closeNavIcon, navNextIcon } from "@/utils/Svgs";
import Image from "next/image";
import React from "react";

const MobileNav = ({ setOpen }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white z-40">
      <div className=" shadow-mobileNavShadow bg-white flex flex-row w-full lg:px-[100px] md:px-8 px-4 pt-4 pb-3 items-center lg:gap-x-10 md:gap-x-7 gap-x-4 justify-between truncate">
        <div className="cursor-pointer" onClick={() => setOpen(false)}>
          {closeNavIcon}
        </div>

        <div className="flex flex-col items-center gap-y-2">
          <div
            className={`w-9 h-9 rounded-full bg-white focus-visible:outline-none`}
          >
            <Image
              src="/images/user.png"
              alt="user"
              width={36}
              height={36}
              className="rounded-full w-9 h-9"
            />
          </div>

          <p className="font-medium">Sam Wheeler</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-y-8 mt-16">
        <div className="flex flex-row items-center gap-x-3 flex-nowrap">
          <p className="sm:text-3xl font-medium text-3xl">New Arrivals</p>
          {navNextIcon}
        </div>

        <div className="flex flex-row items-center gap-x-3 flex-nowrap">
          <p className="sm:text-3xl font-medium text-3xl">Brands</p>
          {navNextIcon}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
