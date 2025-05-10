import { smallFilterIcon } from "@/utils/Svgs";
import React from "react";

const ShowFilterButton = ({ openModal }) => {
  return (
    <div
      onClick={openModal}
      className="w-10 h-10 min-w-10 min-h-10 cursor-pointer rounded-full justify-center items-center bg-searchBarBg flex sm:hidden"
    >
      {smallFilterIcon}
    </div>
  );
};

export default ShowFilterButton;
