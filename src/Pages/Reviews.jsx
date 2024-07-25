import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import ReviewContainer from "../Components/ReviewContainer";
import { useFetch } from "../Hooks/useFetch";
import { fetchAvailableReviews } from "../HelperFn/https";
import { FaStar, FaRegStar, FaSpinner } from "react-icons/fa";
import Loader from "../Components/Loader";

const Reviews = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const REVIEWS_PER_PAGE = 6;

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
    <>
      <div className="w-full md:w-1/2 xl:w-2/3 p-6">
        <h2 className="text-5xl text-slate-700 font-semibold mt-12 mb-24">
          What Our Customers Are Saying.
        </h2>
        {error && <p>Error: {error.message}</p>}
        {isFetching && <Loader />}
        {reviews && reviews.length > 0 && (
          <div>
            {displayReviews.map((review) => (
              <div
                key={review.id}
                className="mb-4 p-4 bg-slate-50 size-11/12 border rounded-xl shadow-xl"
              >
                <div className="flex items-center mb-2">
                  {review.imageBase64 ? (
                    <img
                      src={`data:image/png;base64,${review.imageBase64}`}
                      alt="img"
                      className="w-1/12 object-cover rounded-full mb-9 mt-9 mx-6"
                    />
                  ) : (
                    <div className="bg-cyan-600 text-white rounded-full h-20 w-20 text-xl flex items-center justify-center mx-7 my-7">
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}

                  <div className="ml-4 flex-grow">
                    <h3 className="text-lg font-semibold">{review.name}</h3>
                    <div className="flex justify-between">
                      <p className="flex">{renderStars(review.rating)}</p>
                      <p className="text-gray-600 ml-auto mr-6">
                        Date of experience:{" "}
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <p>{review.message}</p>
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
            containerClassName={"flex justify-end space-x-2 mr-32 my-32 py-9"}
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
      <ReviewContainer
        reviews={reviews}
        refreshReviews={refetch} // Passed the refetch function to refetch without reload
      />
    </>
  );
};

export default Reviews;
