"use client";
import RoundedButton from "@/components/buttons/RoundedButton";
import ReviewBox from "@/components/fields/ReviewBox";
import { closeModalIcon, fullStarIcon, uploadIcon } from "@/utils/Svgs";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitReview } from "@/redux/features/reviews/reviewsThunk";
import { toast } from "sonner";

const GiveReview = ({ isOpen, closeModal, orderId, productId, sellerName }) => {
  const dispatch = useDispatch();
  const { buyers, user } = useSelector((state) => state.users);

  const [rating, setRating] = useState(5); // Default rating
  const [reviewText, setReviewText] = useState("");
  const [images, setImages] = useState([]); // Array to hold selected images
  const [previews, setPreviews] = useState([]); // Array to hold image previews
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Update images and previews
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
    setPreviews((prevPreviews) => [
      ...prevPreviews,
      ...selectedFiles.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleSubmit = async () => {

    if (!reviewText.target.value.trim()) {
      alert("Please enter a review.");
      return;
    }

    setLoading(true);

    try {
      const response = await dispatch(
        submitReview({
          rating,
          description: reviewText.target.value,
          orderId,
          productId,
          images,
          reviewer_name: buyers?.name,
          review_by: user?.id,
        })
      ).unwrap();
      if (response?.alreadyGiven) {
        toast.error("You have already given a review for this product.");
        closeModal();
        setReviewText("");
        setImages([]);
        setPreviews([]);
        return;
      }

      toast.success("Review submitted successfully!");
      closeModal();
      setReviewText("");
      setImages([]);
      setPreviews([]);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[7000000000000]" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="relative w-[505px] max-h-[600px] transform overflow-auto rounded-2xl bg-white px-1 pb-3.5 text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="sticky top-0 z-50 bg-white flex flex-row justify-between w-full items-center py-3.5 border-b border-b-black border-opacity-10 px-4">
                  <p className="font-medium text-xl">Write a review</p>
                  <div
                    onClick={closeModal}
                    className="flex justify-center items-center p-3 rounded-md shadow-closeButtonShadow cursor-pointer"
                  >
                    {closeModalIcon}
                  </div>
                </div>

                {/* Rating */}
                <div className="w-full justify-center flex items-center mt-8">
                  <div className="flex flex-col px-14 items-center gap-y-2.5">
                    <p className="text-center">How would you rate {sellerName}?</p>
                    <div className="flex flex-row gap-x-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div
                          key={star}
                          onClick={() => setRating(star)}
                          className={`cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-300"
                            }`}
                        >
                          {fullStarIcon}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <div className="mt-5 w-full px-7">
                  <ReviewBox
                    label="Review"
                    placeholder="Enter review here..."
                    value={reviewText}
                    setText={setReviewText}
                  />
                </div>

                {/* Image Upload */}
                <div id="drop-zone" className="w-full px-7">
                  <div className="flex items-center justify-center w-full mt-8">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full py-12 rounded-lg cursor-pointer bg-footerBg bg-opacity-5"
                    >
                      <div className="gap-y-1.5 flex flex-col items-center justify-center pt-5 pb-6">
                        {uploadIcon}
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Upload Product Images</span>
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleImageChange}
                        multiple
                      />
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {previews.map((preview, index) => (
                      <div key={index} className="relative w-20 h-20">
                        <Image
                          src={preview}
                          alt={`Preview ${index}`}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="px-7 flex flex-row justify-between w-full items-center gap-x-5 mt-5">
                  <RoundedButton
                    onClick={closeModal}
                    label="Cancel"
                    className="bg-transparent border-black text-black font-normal w-full px-6 py-3.5"
                  />
                  <RoundedButton
                    onClick={handleSubmit}
                    label={loading ? "Submitting..." : "Submit"}
                    className="bg-primary border-primary text-white font-medium w-full px-6 py-3.5"
                    disabled={loading}
                  />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default GiveReview;