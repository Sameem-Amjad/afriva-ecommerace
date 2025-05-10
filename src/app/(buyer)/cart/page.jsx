import CartWrapper from "@/components/layouts/cart/CartWrapper";
import React from "react";

const page = ({ params }) => {
  const { slug } = params;
  return (
    <div className="flex flex-col">
      <div className="pt-28 lg:px-[100px] md:px-8 px-4 w-full flex flex-col">
        <CartWrapper />
      </div>
    </div>
  );
};

export default page;
