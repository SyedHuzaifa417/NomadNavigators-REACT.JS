import React, { useState } from "react";
import Modal from "../Components/Modal";
import AddReview from "../Components/AddReview";
import Login from "../Components/Login";
import { useTravelAuth } from "../Hooks/useTravelAuth.jsx";

const ReviewContainer = ({ reviews, refreshReviews }) => {
  const [modalisOpen, setModalisOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { isLoggedIn } = useTravelAuth();

  const closeModal = () => {
    setModalisOpen(false);
    if (refreshReviews) {
      refreshReviews();
    }
  };

  const openModal = (content) => {
    setModalContent(content);
    setModalisOpen(true);
  };

  const progressBarStyles = (widthPercentage) => ({
    width: `${widthPercentage}%`,
  });

  function ratingNumber(num) {
    const number = reviews.filter((item) => item.rating === num);
    return number.length;
  }

  const handleWriteReviewClick = () => {
    if (isLoggedIn) {
      openModal(
        <AddReview close={closeModal} onReviewSubmitted={refreshReviews} />
      );
    } else {
      openModal(<Login close={closeModal} />);
    }
  };

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="w-full bg-slate-50 dark:bg-stone-700/70 p-4 sm:p-6 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-medium font-sans mb-2">
            Customer Reviews
          </h2>
          <div className="flex items-center">
            <h1 className="text-3xl sm:text-4xl font-bold pr-2">
              {averageRating.toFixed(1)}
            </h1>
            <div className="ml-2">
              <p>⭐⭐⭐⭐⭐</p>
              <p className="text-sm text-gray-600 dark:text-stone-300">
                {reviews ? reviews.length : 0} Reviews
              </p>
            </div>
          </div>
        </div>

        <button
          className="bg-cyan-600 hover:bg-cyan-800 text-white py-2 px-4 rounded-md mt-4 sm:mt-0"
          onClick={handleWriteReviewClick}
        >
          Write a review
        </button>
      </div>

      <div className="mt-4">
        {[5, 4, 3, 2, 1].map((num) => (
          <div className="flex items-center mb-1" key={num}>
            <span className="text-sm text-gray-600 dark:text-slate-300 w-16">
              {num} Stars
            </span>
            <div className="relative w-full h-2 ml-2 bg-gray-300 rounded">
              <div
                className="absolute left-0 top-0 h-2 bg-cyan-500 rounded"
                style={progressBarStyles(
                  (ratingNumber(num) / reviews.length) * 100
                )}
              ></div>
            </div>
            <span className="text-sm text-gray-600 dark:text-slate-300 ml-2 w-8 text-right">
              {ratingNumber(num)}
            </span>
          </div>
        ))}
      </div>
      <Modal open={modalisOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default ReviewContainer;
