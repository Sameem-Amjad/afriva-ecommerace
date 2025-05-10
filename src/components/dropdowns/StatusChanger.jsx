import React from "react";

const StatusChanger = ({ status }) => {
  return (
    <form>
      <div className="relative">
        <select
          id="status"
          disabled={true}
          value={status} // Set the current status as the selected value
          className={`block w-full appearance-none rounded-[4px] px-[10px] py-[6px] text-sm font-semibold focus:border-grayTwo focus:ring-grayTwo ${
            status === "pending"
              ? "bg-[#FF9F431F] text-[#FF9F43]"
              : "bg-greenLight text-greenText" // Conditional styles
          }`}
        >
          <option value="shipped" className="text-base">
            Shipped
          </option>
          <option value="pending" className="text-base">
            Pending
          </option>
        </select>
      </div>
    </form>
  );
};

export default StatusChanger;
