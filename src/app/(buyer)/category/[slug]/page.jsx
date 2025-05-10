import Breadcrumb from "@/components/layouts/category/Breadcrumb";
import CategoryWrapper from "@/components/layouts/category/CategoryWrapper";
import OtherDetails from "@/components/layouts/product/OtherDetails";
import React from "react";

const page = ({ params }) => {
  const { slug } = params;
  return (
    <div className="flex flex-col">
      <div className="pt-28 lg:px-[100px] md:px-8 px-4 w-full flex flex-col">
        <Breadcrumb category={slug} />

        <CategoryWrapper category={slug} />
      </div>
    </div>
  );
};

export default page;
