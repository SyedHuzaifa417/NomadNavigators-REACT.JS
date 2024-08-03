import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import ReviewContainer from "../Components/ReviewContainer";
import { useFetch } from "../Hooks/useFetch";
import { fetchAvailableReviews } from "../HelperFn/https";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";

// import Loader from "../Components/Loader";

const Reviews = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const REVIEWS_PER_PAGE = 8;

  const {
    fetchedData: reviews,
    error,
    isFetching,
    fetchData: refetch,
  } = useFetch(fetchAvailableReviews, []);

  const sortedReviews = reviews.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayReviews = sortedReviews.slice(
    currentPage * REVIEWS_PER_PAGE,
    (currentPage + 1) * REVIEWS_PER_PAGE
  );

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} color="#ffc107" />
        ) : (
          <FaRegStar key={i} color="gray" />
        )
      );
    }
    return stars;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl sm:text-4xl md:text-5xl text-slate-700 font-semibold mt-6 mb-8 sm:mb-12">
        What Our Customers Are Saying.
      </h2>
      <div className="flex flex-col lg:flex-row gap-8 relative">
        <div className="w-full lg:w-3/5">
          {error && <p className="text-red-500">Error: {error.message}</p>}
          {isFetching && (
            <div className="flex items-center justify-center w-full h-full">
              <FaSpinner className="text-blue-500 animate-spin" size={50} />
            </div>
          )}
          {reviews && reviews.length > 0 && (
            <div>
              {displayReviews.map((review) => (
                <div
                  key={review.id}
                  className="mb-4 p-4 bg-slate-50 border rounded-xl shadow-md"
                >
                  <div className="flex items-center mb-2">
                    {review.imageBase64 ? (
                      <img
                        src={`data:image/png;base64,${review.imageBase64}`}
                        alt="img"
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    ) : (
                      <div className="bg-cyan-600 text-white rounded-full h-12 w-12 text-xl flex items-center justify-center">
                        {review.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    )}
                    <div className="ml-4 flex-grow">
                      <h3 className="text-lg font-semibold">{review.name}</h3>
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <p className="flex">{renderStars(review.rating)}</p>
                        <p className="text-gray-600 sm:ml-auto text-sm">
                          Date of experience:{" "}
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2">{review.message}</p>
                </div>
              ))}
            </div>
          )}
          {reviews.length > REVIEWS_PER_PAGE && (
            <ReactPaginate
              previousLabel={"Prev"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={Math.ceil(reviews.length / REVIEWS_PER_PAGE)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={
                "flex justify-center lg:justify-end space-x-2 my-8 py-4"
              }
              pageClassName={"inline-block"}
              pageLinkClassName={
                "px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200"
              }
              previousClassName={"inline-block"}
              previousLinkClassName={
                "px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200"
              }
              nextClassName={"inline-block"}
              nextLinkClassName={
                "px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200"
              }
              breakClassName={"inline-block break-me"}
              breakLinkClassName={
                "px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200"
              }
              activeClassName={"bg-blue-500 text-white"}
            />
          )}
        </div>
        <div className="w-full lg:w-2/5 mb-8 lg:mb-0 lg:sticky lg:top-24 lg:self-start">
          <ReviewContainer reviews={reviews} refreshReviews={refetch} />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
