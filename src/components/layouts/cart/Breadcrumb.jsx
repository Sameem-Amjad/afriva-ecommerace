import { breadCrumbArrowIcon } from "@/utils/Svgs";
import React from "react";

const Breadcrumb = ({ page }) => {
  return (
    <div className="flex flex-row items-center gap-x-3 flex-nowrap border-t border-t-black border-opacity-10 pt-6">
      <div className="flex flex-row gap-x-1 flex-nowrap items-center">
        <p className="opacity-60">Home</p>
        <div className="p-4">{breadCrumbArrowIcon}</div>
      </div>
      <div className="flex flex-row gap-x-1 flex-nowrap items-center">
        <p className="opacity-60">Cart</p>
        {page === "" ? null : <div className="p-4">{breadCrumbArrowIcon}</div>}
      </div>
      <div className="flex flex-row gap-x-1 flex-nowrap items-center">
        <p>{page}</p>
      </div>
    </div>
  );
};

export default Breadcrumb;
