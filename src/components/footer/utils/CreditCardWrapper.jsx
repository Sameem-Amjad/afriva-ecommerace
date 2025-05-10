import React from "react";

const CreditCardWrapper = ({ icon, index }) => {
  return (
    <div
      className="w-12 h-8 rounded-md bg-white flex justify-center items-center"
    >
      {icon}
    </div>
  );
};

export default CreditCardWrapper;
