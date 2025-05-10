import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";

const BagsPerDay = ({ maxQuantity, numberOfBags, setNumberOfBags }) => {


  const handleIncrease = () => {
    setNumberOfBags((prevCount) => Math.min(prevCount + 1, maxQuantity));
  };

  const handleDecrease = () => {
    setNumberOfBags((prevCount) => Math.max(prevCount - 1, 0));
  };
  return (
    <div className="flex justify-between items-center mt-3">
      <div className="flex items-center border-2 px-4 py-2 rounded-lg gap-5">
        <button onClick={handleDecrease} className="">
          <AiOutlineMinus width={15} height={15} />
        </button>
        <span>{numberOfBags}</span>
        <button onClick={handleIncrease} className="">
          <AiOutlinePlus width={15} height={15} />
        </button>
      </div>
    </div>
  );
};

export default BagsPerDay;
