import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import bgIcon from "../Assets/review.jpg";
import { postReview } from "../HelperFn/https";

const AddReview = ({ close, onReviewSubmitted }) => {
  const [isPosting, setIsPosting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [message, setMessage] = useState("");
  const [imageBase64, setImageBase64] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      setImageBase64(base64String);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      name,
      rating,
      message,
      date: new Date(),
      imageBase64,
    };

    try {
      setIsPosting(true);
      await postReview(newReview);
      setIsPosting(false);
      setIsSubmitted(true);

      if (onReviewSubmitted) {
        onReviewSubmitted();
      }

      setName("");
      setRating(0);
      setMessage("");
      setImageBase64("");
    } catch (error) {
      setError({ message: error.message || "Failed to fetch data." });
      setIsPosting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-40 z-50">
      <img src={bgIcon} alt="review" className="rounded-l-3xl w-72 h-128" />

      <div className="bg-sky-100/95 dark:bg-sky-950 rounded-r-3xl  p-6 w-full max-w-md h-128 shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-500"
          onClick={close}
        >
          &times;
        </button>
        <h2 className="text-2xl mb-4 text-center text-gray-800 dark:text-gray-300">
          Share Your Thoughts
        </h2>
        {isSubmitted ? (
          <div className="text-center text-blue-700 dark:text-blue-300">
            Review Submitted Successfully!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-stone-400"
                required
              />
            </div>
            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Rating:
              </label>
              <div className="flex justify-center space-x-1 mt-1">
                {[...Array(5)].map((star, i) => {
                  const ratingValue = i + 1;
                  return (
                    <label key={i}>
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                        style={{ display: "none" }}
                      />
                      <FaStar
                        size={30}
                        color={
                          ratingValue <= (hover || rating) ? "#ffc107" : "gray"
                        }
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                        style={{ cursor: "pointer" }}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Message:
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-stone-400"
                required
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Image:
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:text-gray-400"
              />
            </div>
            <div className="flex space-x-4 pt-2">
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-2xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isPosting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
            {error && <p>Error: {error.message}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default AddReview;
