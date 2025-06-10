"use client";
import React, { useEffect, useState } from "react";
import FilterButton from "./FilterButton";
import SortDropdown from "./SortDropdown";
import RoundedButton from "@/components/buttons/RoundedButton";
import GiveReview from "./GiveReview";
import ReviewCard from "../../homepage/utils/ReviewCard";
import { fetchGetProductReviewsById } from "@/redux/features/products/productsThunk";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { resetProductReviews, setFilters } from "@/redux/features/products/productsSlice";
import dynamic from "next/dynamic";
const Loader = dynamic(() => import("@/components/Loader/Loader"), { ssr: false });
const ReviewTab = ({ id }) => {
  const [openModal, setOpenModal] = useState(false);
  const [start, setStart] = useState(0);
  const dispatch = useDispatch();
  const { buyers } = useSelector((state) => state.users);
  const { productReviews, productReviewsLoading, hasMore, filters } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchGetProductReviewsById({ id, start, limit: 10, ...filters }));
  }, [start, filters, dispatch, id]);

  const handleSortChange = (sort) => {
    dispatch(resetProductReviews());
    dispatch(setFilters({ sort }));
    setStart(0); // Reset pagination
  };

  const handleRatingFilter = (rating) => {
    console.log("rating", rating);
    dispatch(resetProductReviews());
    dispatch(setFilters({ rating }));
    setStart(0); // Reset pagination
  };

  return (
    productReviewsLoading ?
      <Loader />
      :
      <div className="w-full flex flex-col sm:mt-7 mt-9 ">
        <div className="flex flex-row gap-x-1 justify-between w-full">
          <h1 className="font-bold text-2xl sm:mb-7 mb-9">
            Reviews <span className="text-lg opacity-60 font-normal">({productReviews?.length})</span>
          </h1>
          <div className="flex flex-row items-center gap-x-2.5">
            <FilterButton onFilter={handleRatingFilter} />
            <SortDropdown value={filters.sort} setValue={handleSortChange} />
            {
              buyers?.uid &&
              <RoundedButton
                onClick={() => setOpenModal(true)}
                label="Write a Review"
                className=" bg-black border-black text-white font-medium w-full px-6 py-3.5"
              />
            }
          </div>
        </div>
        {/* grid for 2 col and on mobile 1 col */}
        <div className="grid grid-cols-1 gap-4 sm:mt-7 mt-5 sm:grid-cols-2">
          {productReviews?.map((review, index) => (
            <ReviewCard key={index || review?.review_id} review={review} />
          ))}
        </div>

        <div className="w-full flex justify-center sm:mt-11 mt-5 sm:mb-16 mb-12">
          <RoundedButton
            label="Load More Reviews"
            onClick={() => {
              if (hasMore) {
                setStart((prev) => prev + 10);
              } else {
                console.log("No more reviews to load");
                toast.error("No more reviews to load");
              }
            }}
            className="py-4 bg-white text- border-black border-opacity-10 sm:w-[218px] w-full"
          />
        </div>
        <GiveReview isOpen={openModal} closeModal={() => setOpenModal(false)} productId={id} />
      </div>
  );
};

export default ReviewTab;
