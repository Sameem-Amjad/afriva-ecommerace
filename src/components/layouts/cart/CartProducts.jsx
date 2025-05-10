"use client";
import CartProductCard from "@/components/cards/CartProductCard";
import { getCartItemsThunk } from "@/redux/features/cart/cartThunk";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const CartProducts = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(getCartItemsThunk(user?.id))
  }, [dispatch, user?.id]);

  return (
    <div className="flex flex-col py-5 px-6 md:w-[53%] w-full rounded-[20px] border border-black border-opacity-10">
      {
        cartItems?.length > 0 ? (
          <div className="flex flex-col gap-y-5">
            {cartItems?.map((product, index) => (
              <CartProductCard key={product?.cart_id || index} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-full py-10">
            <h1 className="text-[20px] font-bold">Your cart is empty</h1>
            <p className="text-[16px] text-gray-500">Add some products to your cart.</p>
          </div>
        )

      }

    </div>
  );
};

export default CartProducts;
