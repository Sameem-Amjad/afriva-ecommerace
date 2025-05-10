import { emptyStarIcon, fullStarIcon, halfStarIcon } from "@/utils/Svgs";
import Image from "next/image";
import React from "react";

const ReviewCard = ({ className, review }) => {
  return (
    <div
      className={`rounded-[20px] border border-black border-opacity-10 px-8 py-7 gap-y-4 ${className}`}
    >
      <div className="flex flex-row gap-x-1.5">
        {Array.from({ length: 5 }).map((_, index) => {
          const rating = review?.total_score || 0;
          const rounded = Math.floor(rating);

          const isHalf = rating - rounded >= 0.1 && index == rounded;
          return (
            <span key={index}>
              {index < rounded
                ? fullStarIcon
                : isHalf
                  ? halfStarIcon
                  : emptyStarIcon}
            </span>
          );
        })}
      </div>

      <div className="flex flex-col gap-y-3">
        <h3 className="text-xl font-bold">{review?.users?.name || review?.users?.full_address?.name || review?.users?.username}</h3>
        <p className="text-base opacity-60">
          &quot;{review?.description}&quot;
        </p>
        <div className="flex flex-row gap-x-2.5 items-center h-16">
          {
            review?.review_images?.map((image, index) => (
              image && (
                <Image key={index} src={image || null} alt="review" width={40} height={40} />
              )))
          }
        </div>
        <p className="text-sm opacity-60">
          Posted On: {new Date(review?.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
