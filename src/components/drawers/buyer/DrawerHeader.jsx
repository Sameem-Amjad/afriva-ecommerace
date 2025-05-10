import { crossIcon } from "@/svgs";
import React from "react";

const DrawerHeader = ({ handleClose }) => {
  return (
    <div className="flex items-center w-full justify-between">
      <div className="text-2xl font-semibold">Delete Account</div>
      <button
        onClick={handleClose}
        className="flex justify-between gap-2 shadow-md p-2 rounded text-center font-semibold text-black"
      >
        {crossIcon}
      </button>
    </div>
  );
};

export default DrawerHeader;
