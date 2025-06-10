import React from "react";
import { fullStarIcon, emptyStarIcon } from "@/utils/Svgs";

const StarButton = ({ value, onChange, onHover, hoveredValue, disabled }) => (
    <div className="flex flex-row gap-x-1.5">
        {[1, 2, 3, 4, 5].map((star) => (
            <button
                key={star}
                type="button"
                onClick={() => !disabled && onChange(star)}
                onMouseEnter={() => !disabled && onHover(star)}
                onMouseLeave={() => !disabled && onHover(null)}
                className="bg-transparent border-none p-0 cursor-pointer"
                tabIndex={0}
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                disabled={disabled}
            >
                {star <= (hoveredValue ?? value) ? fullStarIcon : emptyStarIcon}
            </button>
        ))}
    </div>
);

export default StarButton;