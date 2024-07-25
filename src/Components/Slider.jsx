import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  IoArrowForwardCircleOutline,
  IoArrowBackCircleOutline,
} from "react-icons/io5";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useFetch } from "../Hooks/useFetch.jsx";
import { fetchAvailableReviews } from "../HelperFn/https";
import Loader from "./Loader.jsx";

const SliderFn = () => {
  const {
    fetchedData: reviews,
    error,
    isFetching,
  } = useFetch(fetchAvailableReviews, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
    <div>
      <style>
        {`
          .slick-prev:before,
          .slick-next:before {
            display: none;
          }
        `}
      </style>
      {error && <p>Error: {error.message}</p>}
      {isFetching && <Loader />}
      {reviews && reviews.length > 0 && (
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-slate-200 p-5 mx-4 mb-4 rounded-3xl shadow-md relative"
            >
              <div className="flex flex-col items-center justify-center">
                {review.imageBase64 && (
                  <img
                    src={`data:image/png;base64,${review.imageBase64}`}
                    alt="img"
                    className="w-1/4 object-cover rounded-full mb-4"
                  />
                )}
                {!review.imageBase64 && (
                  <div className="bg-cyan-600 text-white rounded-full h-28 w-28 text-xl flex items-center justify-center">
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
                <h3 className="text-lg m-0 pt-2">{review.name}</h3>
                <p className="m-1">{formatDate(review.date)}</p>
                <div className="m-1 flex">{renderStars(review.rating)}</div>
                <p className="m-1">{review.message}</p>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "transparent",
        padding: "0.5rem",
        zIndex: 20,
        position: "absolute",
        top: "50%",
        right: "-25px",
        transform: "translateY(-50%)",
      }}
      onClick={onClick}
    >
      <IoArrowForwardCircleOutline
        style={{ color: "dimgray", fontSize: "2rem" }}
      />{" "}
    </div>
  );
};

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "transparent",
        padding: "0.5rem",
        zIndex: 20,
        position: "absolute",
        top: "50%",
        left: "-25px",
        transform: "translateY(-50%)",
      }}
      onClick={onClick}
    >
      <IoArrowBackCircleOutline
        style={{ color: "dimgray", fontSize: "2rem" }}
      />
    </div>
  );
};

export default SliderFn;
