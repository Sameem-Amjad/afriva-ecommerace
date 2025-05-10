import React, { useEffect, useState } from "react";

const DelieveryProgress = () => {
  const [status, setStatus] = useState(0); // Initial value set to "Packed"
  const [isProgressing, setIsProgressing] = useState(true); // To track if we are simulating progress

  const [open, setIsOpen] = useState(false);

  // Function to calculate progress percentage
  const getProgressPercentage = () => {
    switch (status) {
      case 0:
        return 0; // Packed -> 33%
      case 1:
        return 25; // Shipped -> 66%
      case 2:
        return 50; // Delivered -> 100%
      case 3:
        return 75; // Delivered -> 100%
      case 4:
        return 100;
      default:
        return 0;
    }
  };

  // Handle progress simulation
  useEffect(() => {
    // Start the progress simulation when the component is mounted
    if (isProgressing) {
      const progressInterval = setInterval(() => {
        setStatus((prevStatus) => {
          if (prevStatus < 4) {
            return prevStatus + 1;
          } else {
            clearInterval(progressInterval); // Stop the simulation when it reaches "Delivered"
            return prevStatus;
          }
        });
      }, 1000); // Change status every 2 seconds (you can adjust the speed)

      // Clean up the interval on component unmount or if not progressing
      return () => clearInterval(progressInterval);
    }

    return () => {};
  }, [isProgressing]);

  const packItems = () => {
    setIsOpen((state) => !state);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-2">
      <div className="w-full bg-[#E5EBFC]  border-[5px] border-[#E5EBFC] rounded-full relative">
        <div
          className="h-full bg-primary p-[3px] shadow-lg border-2 rounded-lg border-white transition-all duration-500"
          style={{ width: `${getProgressPercentage()}%` }}
        />

        <div className="absolute  top-1/2 -left-2 w-[102%] transform -translate-y-1/2 flex justify-between">
          <div
            className={`w-10 h-10 rounded-full border-2 border-[#E5EBFC] transition-all duration-500 ${
              getProgressPercentage() >= 0 ? "bg-primary" : "bg-[#E5EBFC]"
            }`}
            style={{ left: "0%" }}
          ></div>

          <div
            className={`w-10 h-10 rounded-full border-2 border-[#E5EBFC] transition-all duration-500 ${
              getProgressPercentage() >= 25 ? "bg-primary" : "bg-[#E5EBFC]"
            }`}
            style={{ left: "25%" }}
          ></div>

          <div
            className={`w-10 h-10 rounded-full border-2 border-[#E5EBFC] transition-all duration-500 ${
              getProgressPercentage() >= 50 ? "bg-primary" : "bg-[#E5EBFC]"
            }`}
            style={{ left: "50%" }}
          ></div>
          <div
            className={`w-10 h-10 rounded-full border-2 border-[#E5EBFC] transition-all duration-500 ${
              getProgressPercentage() >= 75 ? "bg-primary" : "bg-[#E5EBFC]"
            }`}
            style={{ left: "75%" }}
          ></div>
          <div
            className={`w-10 h-10 rounded-full border-2 border-[#E5EBFC] transition-all duration-500 ${
              getProgressPercentage() >= 100 ? "bg-primary" : "bg-[#E5EBFC]"
            }`}
            style={{ left: "100%" }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between w-full text-xs font-semibold text-gray-600">
        <span
          className={
            getProgressPercentage() >= 0 ? "text-primary" : "text-gray-600"
          }
        >
          Pick up/ Drop off
        </span>
        <span
          className={
            getProgressPercentage() >= 25 ? "text-primary" : "text-gray-600"
          }
        >
          Ship to warehouse
        </span>
        <span
          className={
            getProgressPercentage() >= 50 ? "text-primary" : "text-gray-600"
          }
        >
          Pending review
        </span>
        <span
          className={
            getProgressPercentage() >= 75 ? "text-primary" : "text-gray-600"
          }
        >
          Refund on its way
        </span>
        <span
          className={
            getProgressPercentage() === 100 ? "text-primary" : "text-gray-600"
          }
        >
          Refund issued
        </span>
      </div>
    </div>
  );
};

export default DelieveryProgress;
