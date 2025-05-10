"use client";
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { crossIcon, plusIconImages } from "@/svgs";

const NewImageSwipper = ({ images, setImages }) => {
  const fileInputRef = useRef(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // Handle clicking on the plus button to open the file picker
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    // Add the newly selected files to the existing images
    setImages((prevImages) => [...prevImages, ...files]);
  };

  // Clean up object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

  return (
    <div className="w-full">
      <div className="rounded-3xl bg-white">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper3 mb-5 h-[300px] rounded-3xl bg-white bg-[url('/images/Upload.svg')] bg-center bg-no-repeat md:h-[467px]"
        >
          {/* Loop through selected images and display them */}
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                src={image instanceof File ? URL.createObjectURL(image) : image || null}
                fill={true}
                alt={`Product image ${index + 1}`}
                style={{ objectFit: "cover", background: "white" }}
              />
              {/* Remove image button */}
              <div
                className="cross-btn z-1 absolute right-3 top-3 cursor-pointer rounded-full bg-white p-1"
                onClick={() => {
                  const updatedFiles = images.filter((_, i) => i !== index);
                  setImages(updatedFiles);
                }}
              >
                {crossIcon}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex w-full items-center gap-[10px]">
        <div className="w-[25%]">
          <button
            onClick={handleButtonClick}
            className="flex h-[99px] w-[100%] cursor-pointer items-center justify-center rounded-[10px] bg-white hover:bg-backgroundSecondary"
          >
            {plusIconImages}
          </button>
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            multiple
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={3}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper4 h-[99px] flex-1"
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={index}
              className="cursor-pointer overflow-hidden rounded-xl bg-white"
            >
              <Image
                src={image instanceof File ? URL.createObjectURL(image) : image || null}
                fill={true}
                alt={`Thumbnail ${index + 1}`}
                style={{ objectFit: "cover", background: "white" }}
              />
              {/* Remove thumbnail */}
              <div
                className="svg-icon absolute right-1 top-1 z-50 cursor-pointer rounded-full bg-white p-1"
                onClick={() => {
                  const updatedFiles = images.filter((_, i) => i !== index);
                  setImages(updatedFiles);
                }}
              >
                {crossIcon}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default NewImageSwipper;
