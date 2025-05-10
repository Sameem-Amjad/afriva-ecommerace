"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const PictureSlider = ({ img = [] }) => {
  const [current, setCurrent] = useState(0);

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    infinite: false,
    adaptiveHeight: false, // Ensure height is fixed and not adaptive to images
    beforeChange: (prev, next) => setCurrent(next),
    appendDots: (dots) => (
      <div style={{ position: "relative", bottom: 50 }}>
        <ul
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0px",
            padding: "0px",
            margin: "0px",
          }}
        >
          {dots}
        </ul>
      </div>
    ),
    customPaging: (index) => (
      <div
        className={`h-2 w-2 rounded-full bg-white ${index === current ? "opacity-100" : "opacity-50"
          }`}
      ></div>
    ),
  };

  const sliderStyle = {
    maxWidth: "100%",
    width: "100%",
    height: "100vh", // Full height of the viewport
    overflow: "hidden",
  };

  return (
    <div style={sliderStyle}>
      {img.length === 0 ? (
        <div>No images available</div>
      ) : (
        <Slider {...settings}>
          {img.map((src, index) => (
            <div
              key={index}
              className="flex justify-center w-full h-[100vh] rounded-[30px] p-3 focus:outline-none"
            >
              <Image
                className="object-cover w-full h-full object-center rounded-[30px]"
                src={src || null}
                width={1600}
                height={1600}
                alt="Login-image"
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default PictureSlider;
