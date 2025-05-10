import Link from "next/link";
import React from "react";

const ColWrapper = ({ title, list }) => {
  return (
    <div className="flex flex-col gap-y-6 sm:w-fit w-[50%] ">
      <h3 className="font-medium">{title}</h3>

      {list.map((item, index) => (
        <Link
          href={item.link}
          key={index}
          className=" text-black opacity-60 hover:opacity-100 transition-all duration-300 ease-in-out"
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default ColWrapper;
