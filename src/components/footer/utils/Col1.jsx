import { socials } from "@/utils/Constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Col1 = () => {
  return (
    <div className="flex flex-col sm:min-w-[248px] sm:w-[248px] w-full">
      <Image
        src="/images/logo.png"
        style={{
          width: "130px",
          height: "auto",
        }}
        width={130}
        height={47.64}
        alt="Afriva-logo"
      />

      <p className="mt-4 opacity-60">
        We have clothes that suits your style and which you’re proud to wear.
        From women to men.
      </p>

      <div className="mt-9 flex flex-row gap-x-3">
        {socials.map((social, index) => (
          <Link
            href={social.link}
            key={index}
            className="w-9 h-9 rounded-full bg-white text-black border border-black border-opacity-10 hover:bg-black hover:text-white hover:border-opacity-100 transition-all duration-300 ease-in-out flex items-center justify-center"
          >
            {social.icon}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Col1;
