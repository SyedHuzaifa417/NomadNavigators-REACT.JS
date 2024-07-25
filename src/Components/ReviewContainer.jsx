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
      refreshReviews(); // Refresh reviews when the modal is closed
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
    const count = number.length;
    return count;
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

  return (
    <div className="w-full md:w-1/2 xl:w-1/3 p-6 shadow-xl absolute top-72 right-20 shadow-slate-400 bg-slate-50">
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-2xl font-medium font-sans mb-4">
            Customer Reviews
          </h2>
          <div className="flex items-center">
            <h1 className="text-4xl font-bold pr-4">4.9</h1>
            <div className="ml-2">
              <p>⭐⭐⭐⭐⭐</p>
              <p className="text-gray-600">
                {reviews ? reviews.length : 0} Reviews
              </p>
            </div>
          </div>
        </div>

        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-sm"
          onClick={handleWriteReviewClick}
        >
          Write a review
        </button>
        <Modal open={modalisOpen} onClose={closeModal}>
          {modalContent}
        </Modal>
      </div>

      <div>
        {[5, 4, 3, 2, 1].map((num) => (
          <div className="flex items-center mb-1" key={num}>
            <span className="text-sm text-gray-600 w-16">{num} Stars</span>
            <div className="relative w-full h-2 ml-2 bg-gray-300 rounded">
              <div
                className="absolute left-0 top-0 h-2 bg-blue-500 rounded"
                style={progressBarStyles(ratingNumber(num))}
              ></div>
            </div>
            <span className="text-sm text-gray-600 ml-2">
              {ratingNumber(num)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewContainer;
