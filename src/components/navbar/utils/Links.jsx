import Link from "next/link";
import React from "react";

const Links = () => {
  return (
    <div className="flex-row items-center h-full gap-x-6 sm:flex hidden">
      <Link href="/new-arrival">
        <p>New Arrivals</p>
      </Link>
      <Link href="/brands">
        <p>Brands</p>
      </Link>
    </div>
  );
};

export default Links;
