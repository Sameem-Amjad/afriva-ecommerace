import { binIcon } from "@/utils/Svgs";
import Image from "next/image";
import React from "react";
import Quantity from "../layouts/cart/utils/Quantity";
import { useDispatch } from "react-redux";
import { removeCartItemThunk } from "@/redux/features/cart/cartThunk";

const CartProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeCartItemThunk(product.cart_id));
  };

  
  return (
    <div className="flex flex-row gap-x-4 w-full pb-6 border-b border-b-black border-opacity-10">
      <div className="flex w-[124px] h-[124px] rounded-lg bg-productBg justify-center items-center overflow-hidden">
        <Image
          src={product?.products?.product_image[0] || null}
          objectFit="contain"
          width={124}
          height={124}
          alt={product?.products?.name}
        />
      </div>

      <div className="flex flex-col w-[calc(100%-124px)]">
        <div className="flex flex-row w-full justify-between gap-x-1">
          <div className="flex flex-col">
            <h2 className="font-bold text-xl">{product?.products?.name || "N/A"}</h2>
            <p className="text-sm ">
              Size: <span className="opacity-60">{product?.selected_size || "N/A"}</span>
            </p>
            <p className="text-sm  flex items-end gap-1" >

              Color: <span className={`w-5 h-5 rounded-full flex justify-center items-center `}
                style={{ backgroundColor: `#${product?.selected_color}` }}
              ></span>
            </p>
          </div>

          <div
            onClick={handleRemove}
            className="w-6 h-6 flex justify-center items-center cursor-pointer">
            {binIcon}
          </div>
        </div>

        <div className="flex flex-row justify-between gap-x-1 items-center">
          <h2 className="font-bold text-xl">
            ${
              product?.products?.size_details?.find(
                (size) => size.size === product.selected_size
              )?.price * product.quantity || 0
            }
          </h2>

          <Quantity
            cartId={product.cart_id}
            quantity={product.quantity}
            maxQuantity={product?.products.size_details?.find(
              (size) => size.size === product.selected_size
            )?.quantity}
          />
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
