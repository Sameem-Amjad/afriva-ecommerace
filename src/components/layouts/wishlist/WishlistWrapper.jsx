"use client";
import RoundedButton from "@/components/buttons/RoundedButton";
import React, { useEffect } from "react";
import WishlistProducts from "./WishlistProducts";
import { wishlistIcon } from "@/utils/Svgs";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetFavouriteProducts } from "@/redux/features/products/productsThunk";

const WishlistWrapper = () => {
  const { totalFavouriteProducts } = useSelector(
    (state) => state.products
  );
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGetFavouriteProducts({ userId: user?.id, start: 0, limit: 10 }));
  }
    , [user?.id, dispatch]);

  return (
    <div className="pt-28 lg:px-[100px] md:px-8 px-4 w-full flex flex-col">
      {/* Header */}
      <div className="flex flex-row justify-between gap-x-1 items-center w-full">
        <h1 className="text-[40px] font-bold">
          Wishlist <span className="text-base font-normal opacity-60">({totalFavouriteProducts})</span>
        </h1>
        {/* <div className="w-[223px]">
          <RoundedButton
            onClick={() => { }}
            label="Move All To Bag"
            className=" bg-transparent border-black text-black font-medium px-6 py-3.5"
          />
        </div> */}
      </div>

      {totalFavouriteProducts === 0 ? (
        <div className="flex justify-center items-center sm:mt-20 mt-9">
          <div className="flex flex-col items-center justify-center lg:w-1/2 md:w-[75%] w-full">
            {wishlistIcon}
            <h1 className="text-[28px] font-bold mt-10">
              Your Wishlist is Empty!
            </h1>
            <p className="text-xl opacity-60 text-center mt-4">
              No favorites yet? Start exploring and find something you love! 🌟
              Add some sparkle now! 🚀
            </p>

            <RoundedButton
              label="Shop Now"
              className=" bg-primary border-primary text-white font-medium w-full px-6 py-3.5 mt-11"
            />
          </div>
        </div>
      ) : (
        <WishlistProducts />
      )}
    </div>
  );
};

export default WishlistWrapper;
