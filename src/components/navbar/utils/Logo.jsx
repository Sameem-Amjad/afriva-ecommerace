import Image from "next/image";
import React from "react";
import Hamburger from "./Hamburger";
import Link from "next/link";

const Logo = ({ open, setOpen }) => {
  return (
    <>
      <Hamburger open={open} setOpen={setOpen} />
      <Link href="/" className="w-[120px] sm:w-[161px] md:w-[170px] lg:w-[200px] gap-x-4 flex flex-row items-center">
        <Image
          layout="responsive"
          src="/images/logo.png"
          className="cursor-pointer w-[161px] h-auto"
          width={161}
          height={59}
          alt="Afriva-logo"
        />
      </Link>
    </>
  );
};

export default Logo;
