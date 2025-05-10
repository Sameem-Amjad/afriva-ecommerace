"use client";
import RoundedButton from "@/components/buttons/RoundedButton";
import ProductCard from "@/components/cards/ProductCard";
import Browse from "@/components/layouts/homepage/Browse";
import React, { useEffect } from "react";
import { fetchGetNewArrivalPaginatedProducts } from "@/redux/features/products/productsThunk";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
const Page = () => {
  const dispatch = useDispatch();
  const [start, setStart] = React.useState(0);

  const { arrivalProducts, hasMore, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch products. Please try again.");
    }
  }, [error]);
  useEffect(
    () => {
      dispatch(fetchGetNewArrivalPaginatedProducts({ start: start, limit: 25 }));
    },

    [start, dispatch]
  )

  return (
    <div className="pt-28 w-full flex flex-col">
      {/* Header */}
      <div className="lg:px-[100px] md:px-8 px-4 flex flex-col items-center w-full">
        <div className="flex justify-center w-full sm:pb-16 pb-8">
          <h1 className="text-[40px] font-bold">New Arrivals  </h1>
        </div>

        <div className="flex flex-row w-full flex-wrap gap-x-6 justify-center gap-y-6">

          {arrivalProducts.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
            />
          ))}

        </div>

        <RoundedButton
          onClick={() => {
            if (!hasMore || start + 26 >= 101) {
              toast.error("No more products to load");
              return;
            }
            setStart((prev) => prev + 25)
          }}
          // disabled={!hasMore || loading}
          label="View All"
          className="py-4 bg-white text-black border-black border-opacity-10 sm:w-[218px] w-full sm:mt-16 mt-8"
        />
      </div>
      <Browse />
    </div>
  );
};

export default Page;
