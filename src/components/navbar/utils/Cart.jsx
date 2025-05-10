"use client";
import { cartIcon } from "@/utils/Svgs";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const { cartItems } = useSelector(state => state.cart)
  return (
    <Link href="/cart" className="relative w-8 h-8 flex justify-center items-center">
      {cartIcon}

      <div className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 flex justify-center items-center rounded-full">
        <p>{cartItems.length}</p>
      </div>
    </Link>
  );
};

export default Cart;
