"use client";
import RoundedButton from "@/components/buttons/RoundedButton";
import { largeZaraIcon } from "@/utils/Svgs";
import { useRouter } from "next/navigation";
import React from "react";
import BrandProducts from "./BrandProducts";
import Image from "next/image";

const BrandWrapper = ({ brand }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-y-8 w-full">
      <div className="flex flex-row justify-between items-center">
        <Image src={brand?.logo_url || null} alt={brand?.name} width={100} height={100} className=" object-contain" />

        <div className="w-[218px]">
          <RoundedButton
            onClick={() => router.push("/category/zara")}
            label="View All"
            className="py-4 bg-white text- border-black border-opacity-10 sm:w-[218px] w-full sm:mt-16 lg:mt-0 mt-8"
          />
        </div>
      </div>

      <BrandProducts products={brand?.products} />
    </div>
  );
};

export default BrandWrapper;
