import Image from "next/image";
import React from "react";

const HeroImage = () => {
  return (
    <div className="flex w-full md:w-[50%] h-full justify-center items-end relative">
      <div className="w-[600px] sm:w-[390px] md:w-[1000px] lg:w-[731px]">
        <Image
          layout="responsive"
          src="/images/hero_image.png"
          width={731}
          height={663}
          alt="Afriva-hero"
        />
      </div>

      <div className="absolute top-1/2 left-0">
        <Image
          src="/images/star1.png"
          className="md:w-[56px] w-[44px] h-auto"
          width={56}
          height={56}
          alt="Hero-image"
        />
      </div>

      <div className="absolute top-1/3 right-0">
        <Image
          src="/images/star2.png"
          className="md:w-[104px] w-[76px] h-auto"
          width={104}
          height={104}
          alt="Hero-image"
        />
      </div>
    </div>
  );
};

export default HeroImage;
