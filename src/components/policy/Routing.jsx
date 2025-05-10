import React from "react";
import Link from "next/link";

const Routing = ({ data }) => {
  return (
    <div className="flex-col w-[30%] sticky top-28 hidden md:flex left-0 self-start pt-[57px]">
      <h2 className="text-3xl font-semibold">TABLE OF CONTENTS</h2>
      <div className="border-l-2 text-graytoc font-medium border-black px-9 py-5 mt-[23px] flex flex-col">
        {data.map(({ name, id }) => (
          <Link key={id} className="p-3" href={`#${id}`}>
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Routing;
