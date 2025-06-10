import React from "react";

const getStatusSteps = (status) => {
  const steps = [
    { label: "Return Requested", value: "return requested" },
  ];
  if (status === "return accepted") {
    steps.push({ label: "Return Accepted", value: "return accepted" });
  } else if (status === "return rejected") {
    steps.push({ label: "Return Rejected", value: "return rejected" });
  }
  return steps;
};

const getProgressPercentage = (status) => {
  switch (status) {
    case "return requested":
      return 50;
    case "return accepted":
    case "return rejected":
      return 100;
    default:
      return 0;
  }
};

const DelieveryProgress = ({ status }) => {
  const statusSteps = getStatusSteps(status);
  const progress = getProgressPercentage(status);

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-2">
      <div className="w-full bg-[#E5EBFC] border-[5px] border-[#E5EBFC] rounded-full relative">
        <div
          className="h-full bg-primary p-[3px] shadow-lg border-2 rounded-lg border-white transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
        <div className="absolute top-1/2 -left-2 w-[102%] transform -translate-y-1/2 flex justify-between">
          {statusSteps.map((step, idx) => (
            <div
              key={step.value}
              className={`w-10 h-10 rounded-full border-2 border-[#E5EBFC] transition-all duration-500 ${progress >= ((idx + 1) / statusSteps.length) * 100 ? "bg-primary" : "bg-[#E5EBFC]"
                }`}
            ></div>
          ))}
        </div>
      </div>
      <div className="flex justify-between w-full text-xs font-semibold text-gray-600">
        {statusSteps.map((step, idx) => (
          <span
            key={step.value}
            className={progress >= ((idx + 1) / statusSteps.length) * 100 ? "text-primary" : "text-gray-600"}
          >
            {step.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DelieveryProgress;
