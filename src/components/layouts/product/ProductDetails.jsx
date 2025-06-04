"use client"
import React, { use, useEffect, useState } from "react";
import AddFav from "./utils/AddFav";
import { emptyStarIcon, fullStarIcon, halfStarIcon, zaraLargeIcon } from "@/utils/Svgs";
import ColorsWrapper from "./utils/ColorsWrapper";
import SizeWrapper from "./utils/SizeWrapper";
import Quantity from "./utils/Quantity";
import RoundedButton from "@/components/buttons/RoundedButton";
import { supabase } from "../../../../supabase";
import { toast } from "sonner";
import { addToCartThunk } from "@/redux/features/cart/cartThunk";
import { useDispatch, useSelector } from "react-redux";


const ProductDetails = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product?.size_details?.[0]?.color);
  const [selectedSize, setSelectedSize] = useState(product?.size_details?.[0]?.size);

  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const selectedDetails = product?.size_details?.find(
    (detail) => detail.size === selectedSize && detail.color === selectedColor
  );



  const AddToCart = async (product) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const isAuthenticated = session && session.user;
    if (isAuthenticated) {
      const response = dispatch(
        addToCartThunk({
          userId: session.user.id,
          productId: product.id,
          quantity: quantity,
          selectedSize: selectedSize,
          selectedColor: selectedColor
        })
      )
      if (response.error) {
        toast.error("Error adding to cart. Please try again.");
      } else {
        toast.success("Item added to cart successfully!");
      }
      return response;
    }

    else {
      toast.error("You need to be logged in to add items to the cart.");
      return;
    }

  }

  useEffect(() => {
    setQuantity(1);
  }, [selectedSize])

  return (
    <div className="flex flex-col flex-grow sm:w-[48%] w-full">
      {/* title and add to fav */}
      <div className="flex flex-row items-center gap-x-4 justify-between w-full">
        <h1 className="font-bold md:text-[40px] text-[30px]">{product?.name}</h1>

        <AddFav id={product?.id} />
      </div>

      {/* rating price and brand */}
      <div className="flex flex-row justify-between gap-x-1 items-center w-full">
        <div className="flex flex-col gap-y-3.5">
          {/* rating */}
          <div className="flex flex-row items-center mt-3.5 gap-x-4">
            <div className="flex flex-row gap-x-1.5">
              {Array.from({ length: 5 }).map((_, index) => {
                const rating = product?.overall_rating?.rating || 0;
                const rounded = Math.floor(rating);

                const isHalf = rating - rounded >= 0.1 && index == rounded;
                return (
                  <span key={index}>
                    {index < rounded
                      ? fullStarIcon
                      : isHalf
                        ? halfStarIcon
                        : emptyStarIcon}
                  </span>
                );
              })}
            </div>

            <p>
              {product?.overall_rating?.rating?.toFixed(2) || 0}/ <span className="opacity-60">5</span>
            </p>
          </div>
          {/* price */}
          <p className="text-3xl font-bold">${selectedDetails?.price || 0}</p>
        </div>
        <div className="sm:block hidden">

          {zaraLargeIcon}
        </div>
      </div>

      <p className="opacity-60 mt-6">

        {product?.description || "N/A"}
      </p>

      <ColorsWrapper
        colors={[...new Set(product?.size_details?.map((detail) => detail.color))]}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />

      <SizeWrapper
        sizes={product?.size_details?.filter((detail) => detail.color === selectedColor)
          .map((detail) => detail.size)}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />

      <div className="flex flex-row gap-x-5 w-full">
        <Quantity
          quantity={quantity}
          setQuantity={setQuantity}
          maxQuantity={selectedDetails?.quantity || 0}
        />
        {
          selectedDetails?.quantity === 0 || selectedDetails?.quantity === "" ? (
            <p className="text-red-500 text-sm py-4  w-full text-center font-bold">Out of stock</p>
          ) :
            <RoundedButton
              label="Add to Cart"
              onClick={() => AddToCart(product)}
              className="py-4 bg-primary border-primary w-fit text-white"
            />
        }
      </div>
    </div>
  );
};

export default ProductDetails;
