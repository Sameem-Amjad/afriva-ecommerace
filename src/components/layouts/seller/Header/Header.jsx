"use client";
import React from "react";
import { logoutSvg } from "@/svgs";
import { useRouter } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { toast } from "sonner";
import Image from "next/image";

const Header = ({ toggleNavbar }) => {
  const router = useRouter();

  const logout = async () => {
    router.push("/");
  };

  return (
    <div className="flex sticky top-0 bg-white z-40 items-center justify-between px-6 py-4 shadow-md w-full">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleNavbar}
          className="hover:bg-primaryHover rounded-lg bg-primary p-4 text-white md:hidden"
        >
          <GiHamburgerMenu />
        </button>
        <h3 className="text-2xl hidden md:block font-semibold">
          Good Morning 👋🏻
        </h3>
      </div>
      <div className="flex border-2 border-solid	rounded-xl  min-w-fit  justify-between p-2 h-[66px] gap-6 md:gap-10">
        <div className="flex gap-2 items-center">
          <Image
            width={44}
            height={44}
            alt="User"
            src="/images/profile-avatar.jpeg"
            className="rounded-md hover:cursor-pointer focus:outline-none"
          />
          <div className="flex flex-col">
            <p className="text-p font-semibold text-black">Welcome back,</p>
            <p className="text-p1 font-semibold text-gray-400">Ralph</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="p-2 transition-colors duration-200 ease-in-out hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 rounded-lg"
          title="Logout"
        >
          {logoutSvg}
        </button>
      </div>
    </div>
  );
};

export default Header;
