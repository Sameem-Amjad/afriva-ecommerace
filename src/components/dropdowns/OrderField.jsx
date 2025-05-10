import { arrowDownGray } from "@/svgs";
import { useState } from "react";

const OrderField = ({ onFilterChange }) => {
  const [typeFilter, setTypeFilter] = useState("all");

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setTypeFilter(value);
    onFilterChange(value);
  };

  return (
    <form className="flex w-[150px] items-center rounded-md border border-fieldBorder">
      <div className="relative h-full w-full">
        <select
          value={typeFilter}
          onChange={handleFilterChange}
          className="bg-grayFive text-grayThree block h-full w-full appearance-none rounded-lg bg-backgroundSecondary px-4 py-3 text-xs focus:border-grayTwo focus:ring-grayTwo"
        >
          <option value="active" className="text-base">
            Active order
          </option>
          <option value="completed" className="text-base">
            Complete orders
          </option>
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          {arrowDownGray}
        </div>
      </div>
    </form>
  );
};

export default OrderField;
