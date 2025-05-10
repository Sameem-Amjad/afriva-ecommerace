import { hamburgerIcon } from "@/utils/Svgs";
import React from "react";

const Hamburger = ({ open, setOpen }) => {
  return (
    <div
      className="block sm:hidden cursor-pointer p-1"
      onClick={() => setOpen(!open)}
    >
      {hamburgerIcon}
    </div>
  );
};

export default Hamburger;
