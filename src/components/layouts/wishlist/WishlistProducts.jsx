import ProductCard from "@/components/cards/ProductCard";
import React from "react";
import { useSelector } from "react-redux";

const WishlistProducts = () => {

  const { favouriteProducts } = useSelector(
    (state) => state.products
  );

  return (
    <div className="flex flex-row w-full flex-wrap gap-x-6 justify-start gap-y-6 mt-10">
      {favouriteProducts?.map((product) => (
        <div key={product.id} className="w-full sm:w-[calc(50%-1.5rem)] md:w-[calc(33.3333%-1.5rem)] lg:w-[calc(25%-1.5rem)]">
          <ProductCard product={product} fav={true} />
        </div>
      ))}
    </div>
  );
};

export default WishlistProducts;
