"use client";
import React, { useEffect } from "react";
import ReviewCard from "./ReviewCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "@/redux/features/reviews/reviewsThunk";

const ReviewsSlider = ({ sliderRef }) => {
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.reviews);

  useEffect(
    () => {
      dispatch(fetchReviews());
    }, [dispatch]
  )

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "-100px",
    slidesToShow: 5,
    speed: 500,
    responsive: [
      {
        breakpoint: 1901,
        settings: {
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "20px",
          slidesToShow: 3.5,
          speed: 500,
        },
      },
      {
        breakpoint: 1486,
        settings: {
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "20px",
          slidesToShow: 2.5,
          speed: 500,
        },
      },
      {
        breakpoint: 1068,
        settings: {
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "20px",
          slidesToShow: 2,
          speed: 500,
        },
      },

      {
        breakpoint: 851,
        settings: {
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "-100px",
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
        },
      },
    ],
  };

  return (
    <div className="slider-container overflow-hidden">
      <Slider {...settings} id="slider-2" ref={sliderRef}>
        {
          reviews
            ?.filter((review) => review?.total_score === 5)
            .map((review, index) => (
              <ReviewCard
                key={review?.review_id || `review-${index}`}
                className={"sm:w-[400px] w-[300px]"}
                review={review}
              />
            ))
        }
      </Slider>
    </div>
  );
};

export default ReviewsSlider;
