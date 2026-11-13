"use client";
import React from "react";
import BrandProducts from "./BrandProducts";
import Image from "next/image";

const BrandWrapper = ({ brand }) => {
  const count = brand?.products?.length || 0;
  return (
    <div className="flex flex-col gap-y-8 w-full">
      <div className="flex flex-row items-center gap-5">
        {brand?.logo_url && (
          <Image src={brand.logo_url} alt="" width={100} height={100} className="h-[100px] w-[100px] rounded-full object-contain" />
        )}
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">{brand?.name}</h2>
          {brand?.brandaddress && <p className="opacity-60">{brand.brandaddress}</p>}
          <p className="opacity-60 text-sm">{count} {count === 1 ? "product" : "products"}</p>
        </div>
      </div>

      <BrandProducts products={brand?.products} />
    </div>
  );
};

export default BrandWrapper;
