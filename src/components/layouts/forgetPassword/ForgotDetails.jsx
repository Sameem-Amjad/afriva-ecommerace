import EmailField from "@/components/fields/EmailField";
import { successIcon } from "@/utils/Svgs";
import React from "react";
import Step1 from "./utils/Step1";
import Step2 from "./utils/Step2";
import Step3 from "./utils/Step3";
import Step4 from "./utils/Step4";

const ForgotDetails = ({ step, setStep }) => {
  //   const [email, setEmail] = useState("");
  return (
    <div className="flex lg:w-[70%] md:w-[55%] w-full overflow-hidden py-7 lg:px-8 px-3 justify-center items-center">
      {step === 0 && <Step1 setStep={setStep} step={step} />}

      {step === 1 && <Step2 setStep={setStep} step={step} />}

      {step === 2 && <Step3 setStep={setStep} step={step} />}

      {step === 3 && <Step4 setStep={setStep} step={step} />}
    </div>
  );
};

export default ForgotDetails;
