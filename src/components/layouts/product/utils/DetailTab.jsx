import React from "react";

const DetailTab = ({ detail }) => {
  return (
    <div className="w-full flex flex-col sm:mt-7 mt-9 ">
      <h1 className="font-bold text-2xl sm:mb-7 mb-9">Details</h1>

      <p className="opacity-60">
        {detail || "N/A"}
      </p>
      {/* <br />
      <p className="opacity-60">
        I absolutely love this t-shirt! The design is unique and the fabric
        feels so comfortable. As a fellow designer, I appreciate the attention
        to detail. Its become my favorite go-to shirt. I absolutely love this
        t-shirt! The design is unique and the fabric feels so comfortable. As a
        fellow designer, I appreciate the attention to detail. Its become my
        favorite go-to shirt. I absolutely love this t-shirt! The design is
        unique and the fabric feels so comfortable. As a fellow designer, I
        appreciate the attention to detail. Its become my favorite go-to shirt.
      </p>
      <br />
      <p className="opacity-60">
        I absolutely love this t-shirt! The design is unique and the fabric
        feels so comfortable. As a fellow designer, I appreciate the attention
        to detail. Its become my favorite go-to shirt. I absolutely love this
        t-shirt! The design is unique and the fabric feels so comfortable. As a
        fellow designer, I appreciate the attention to detail. Its become my
        favorite go-to shirt. I absolutely love this t-shirt! The design is
        unique and the fabric feels so comfortable. As a fellow designer, I
        appreciate the attention to detail. Its become my favorite go-to shirt.
      </p> */}
    </div>
  );
};

export default DetailTab;
