"use client";
import { favIcon } from "@/utils/Svgs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { fetchIsFavourite, fetchRemoveFromFavourites, fetchAddToFavourites } from "@/redux/features/products/productsThunk";

const AddFav = ({ id }) => {
  const { user } = useSelector(state => state.users)
  const dispatch = useDispatch()
  const router = useRouter()
  const { isFavouriteProduct } = useSelector(state => state.products)
  const fav = !!user?.id && isFavouriteProduct

  useEffect(() => {
    // Only signed-in shoppers have a wishlist.
    if (id && user?.id) dispatch(fetchIsFavourite({ productId: id, userId: user.id }))
  }, [id, user?.id, dispatch])

  const toggle = () => {
    if (!user?.id) {
      toast.info("Log in to save products to your wishlist");
      router.push("/login");
      return;
    }
    dispatch(fav ? fetchRemoveFromFavourites({ productId: id, userId: user.id }) : fetchAddToFavourites({ productId: id, userId: user.id }))
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={fav}
      aria-label={fav ? "Remove from wishlist" : "Add to wishlist"}
      className={`w-10 h-10 rounded-full cursor-pointer flex justify-center items-center transition-all duration-300 ease-in-out min-w-10 min-h-10 ${fav ? "bg-redColor bg-opacity-10 text-redColor" : "bg-grayMid text-grayMid bg-opacity-10"
        }`}
    >
      {favIcon}
    </button>
  );
};

export default AddFav;
