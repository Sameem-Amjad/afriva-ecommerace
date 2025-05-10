import { heartIcon } from "@/utils/Svgs";
import Link from "next/link";
import React from "react";

const Heart = () => {
  return (
    <Link
      href="/wishlist"
      className="relative w-8 h-8 flex justify-center items-center"
    >
      {heartIcon}
    </Link>
  );
};

export default Heart;
