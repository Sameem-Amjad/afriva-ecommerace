"use client";
import Image from "next/image";
import React from "react";

// remove with the api data of the product
// const images = [
//   "/images/sample1.png",
//   "/images/sample2.png",
//   "/images/sample3.png",
// ];
const ProductImages = ({ images }) => {
  const [display, setDisplay] = React.useState(0);

  return (
    <div className="flex sm:flex-row flex-col sm:w-[48%] w-full gap-3.5">
      <div className="flex sm:flex-col flex-row gap-3.5 sm:justify-start justify-center sm:order-1 order-2">
        {images?.map((image, index) => (
          <div
            key={index}
            onClick={() => setDisplay(index)}
            className={`sm:w-[152px] border sm:h-[167px] bg-productBg overflow-hidden rounded-[20px] cursor-pointer w-[120px] h-[120px]
              ${display === index ? " border-black" : "border-transparent"}`}
          >
            <Image
              src={image || "/images/sample1.png"}
              objectFit="contain"
              width={152}
              height={167}
              placeholder="blur"
              blurDataURL="/images/sample1.png"
              alt="Afriva-product"
              className="w-full h-auto"
            // fill
            // sizes="100vw"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center bg-productBg overflow-hidden h-fit rounded-[20px] sm:order-2 order-1">
        <Image
          src={images?.[display] || "/images/sample1.png"}
          className="w-full h-auto"
          width={444}
          height={530}
          alt="Afriva-product"
          objectFit="contain"
        // fill
        // sizes="100vw"
        />
      </div>
    </div>
  );
};

export default ProductImages;
