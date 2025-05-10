"use client";
import React, { useEffect } from "react";
import NavSearchBar from "../fields/NavSearchBar";
import Logo from "./utils/Logo";
import Links from "./utils/Links";
import OptionsWrapper from "./utils/OptionsWrapper";
import MobileNav from "./utils/MobileNav";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const { searchProducts } = useSelector((state) => state.products);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <div className="fixed top-0 bg-white z-50 flex flex-row w-full lg:px-[100px] md:px-8 px-4 pt-4 pb-3 items-center lg:gap-x-10 md:gap-x-7 gap-x-4 justify-between ">
      {/* Hamburger */}

      {/* logo */}
      <Logo open={open} setOpen={setOpen} />

      {/* links */}

      <Links />

      {/* search bar */}
      <div className="relative flex flex-row items-center w-[35%] gap-x-2">
        <NavSearchBar search={search} setSearch={setSearch} />
        {search !== "" && searchProducts.length > 0 && (
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg w-[280px] max-h-[300px] overflow-y-auto z-50">
            {searchProducts.map((product) => (
              <div key={product.id} onClick={() => router.push(`/product/${product?.id}`)} className="p-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
                <Image
                  src={product?.product_image?.[0] || null}
                  alt={product?.name}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <div className="text-sm font-semibold opacity-60 truncate ">{product?.name}</div>

              </div>
            ))}
          </div>
        )}

      </div>
      {/* options */}
      <OptionsWrapper />

      {open && <MobileNav setOpen={setOpen} />}
    </div>
  );
};

export default Navbar;
