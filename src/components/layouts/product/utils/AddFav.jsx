"use client";
import { favIcon } from "@/utils/Svgs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIsFavourite, fetchRemoveFromFavourites, fetchAddToFavourites } from "@/redux/features/products/productsThunk";

const AddFav = ({ id }) => {
  const { user } = useSelector(state => state.users)
  const dispatch = useDispatch()
  const { isFavouriteProduct } = useSelector(state => state.products)

  useEffect(() => {
    dispatch(fetchIsFavourite({ productId: id, userId: user?.id }))
  }, [id, user?.id, dispatch])

  return (
    <div
      onClick={() => isFavouriteProduct ? dispatch(fetchRemoveFromFavourites({ productId: id, userId: user?.id })) : dispatch(fetchAddToFavourites({ productId: id, userId: user?.id }))}
      className={`w-10 h-10 rounded-full cursor-pointer flex justify-center items-center transition-all duration-300 ease-in-out min-w-10 min-h-10 ${isFavouriteProduct ? "bg-redColor bg-opacity-10 text-redColor" : "bg-grayMid text-grayMid bg-opacity-10"
        }`}
    >
      {favIcon}
    </div >
  );
};

export default AddFav;
