"use client"
import { subEmail } from "@/utils/Svgs";

const SubscribeField = ({ search, setSearch, setEmail, email }) => {

  return (
    <div className="flex flex-row bg-white rounded-[62px] px-4 py-3 items-center">
      {subEmail}
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Enter your email"
        className="bg-transparent outline-none border-none ml-3 w-full placeholder:text-black placeholder:text-opacity-40"
      />
    </div>
  );
};

export default SubscribeField;
