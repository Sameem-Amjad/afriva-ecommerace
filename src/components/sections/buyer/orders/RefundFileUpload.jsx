"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { chevronRightBlack, crossIcon, plusIconImages } from "@/svgs";
import { useDispatch, useSelector } from "react-redux";
import { addImage, removeImage } from "@/redux/features/return_products/returnSlice";
import { addReturnRequestThunk } from "@/redux/features/return_products/returnThunk";
import { toast } from "sonner";

const RefundFileUpload = ({ setState }) => {
  const fileInputRef = useRef(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const dispatch = useDispatch();
  const { images } = useSelector((state) => state.returnRequests.returnRequest);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        dispatch(addImage(reader.result)); // Add each image to the Redux state
      };
      reader.readAsDataURL(file);
    });
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = () => {
    if (images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }
    dispatch(addReturnRequestThunk());
    toast.success("Return request submitted successfully.");
    setState("list");
  };

  return (
    <div className="flex flex-col gap-5 p-8">
      <div className="flex items-center ">
        <h1
          className="rotate-180 hover:cursor-pointer mr-5"
          onClick={() => setState("refundDetails")}
        >
          {chevronRightBlack}
        </h1>
        <h1 className="text-2xl font-bold">Return & Refund</h1>
        <hr />
      </div>
      <div id="drop-zone">
        {images.length <= 0 && (
          <div className="flex items-center justify-center w-full">


            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-52 border-gray-300 rounded-lg cursor-pointer bg-uploadBg hover:bg-whiteLight"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Image 
                  width={50}
                  height={50}
                  alt="Upload"
                src="/images/green-gallery.png" />
                <p className="mb-2 text-sm text-grayDark">
                  <span className="font-semibold">Upload Photo</span>{" "}
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                multiple
              />
            </label>
          </div>
        )}
      </div>
      <div className="w-full md:w-[600px]">
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
                  src={image}
                  fill={true}
                  alt={`Thumbnail ${index + 1}`}
                  style={{ objectFit: "cover", background: "white" }}
                />
                <div
                  className="svg-icon absolute right-1 top-1 z-50 cursor-pointer rounded-full bg-white p-1"
                  onClick={() => dispatch(removeImage(index))}
                >
                  {crossIcon}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="flex w-full justify-end items-center gap-[19px]">
        <button
          onClick={() => setState("list")}
          className="rounded-[44px] w-[160px] text-grayDark border border-grayDark px-[22px] py-[10px] font-semibold"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="rounded-[44px] w-[160px] bg-buttonGradient px-[22px] py-[10px] font-semibold text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default RefundFileUpload;