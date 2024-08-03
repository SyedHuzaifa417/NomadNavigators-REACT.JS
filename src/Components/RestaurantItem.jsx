import React from "react";
import { FaLocationArrow } from "react-icons/fa";

const RestaurantItem = ({ restrnt }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <img
          src={`data:image/jpeg;base64,${restrnt.imageBase64}`}
          alt={restrnt.restaurantName}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">
            {restrnt.restaurantName}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex flex-row gap-2">
            <FaLocationArrow />
            {restrnt.placeName}
          </p>
          <div className="flex justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {restrnt.speciality}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Rating: {restrnt.rating}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {restrnt.type}
            </span>
            <span className="text-sm font-bold">
              ${restrnt.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
