import React from "react";
import { Link } from "react-router-dom";
import { GrMapLocation } from "react-icons/gr";
import { useTravelAuth } from "../Hooks/useTravelAuth";
import { BsCart } from "react-icons/bs";

const PlaceItem = ({ place, index }) => {
  const { selectedPlace, setSelectedPlace } = useTravelAuth();

  const isSelected = selectedPlace && selectedPlace.id === place.id;

  function handleAddPlace() {
    setSelectedPlace(isSelected ? null : place);
  }

  return (
    <div
      key={place.id}
      className="place-item flex items-start gap-6 p-9 border-b pb-16 border-blue-300 max-w-7xl mx-auto"
    >
      <div className="relative flex-shrink-0 w-96 h-96 rounded-lg overflow-hidden">
        <img
          src={`data:image/png;base64,${place.imageBase64}`}
          alt={place.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className=" flex flex-col justify-between flex-grow">
        <div className="flex  items-start gap-6">
          <div>
            <div className="flex-shrink-0 w-4 mt-7 mb-3 text-center text-gray-500 dark:text-stone-400 font-bold">
              {index + 1 < 10 ? `0${index + 1}` : index + 1}.
            </div>
            <h2 className="place-title text-2xl font-bold text-gray-800 dark:text-stone-200 pt-4">
              {place.name}
            </h2>
            <h2 className="mb-4 mt-2 text-lg font-light flex">
              <GrMapLocation className="mr-3 mb-1" />
              {place.country}
            </h2>
            <p className="place-description text-lg text-gray-600 dark:text-stone-400">
              {place.description}
            </p>
          </div>
          <h1 className="mt-7 mr-9 font-extrabold text-xl text-slate-700 dark:text-stone-300">
            {`$${place.price}`}
          </h1>
        </div>
        <div className="flex gap-x-72 mt-7">
          <div className="flex gap-9">
            <h2 className="flex-shrink-0 text-center text-gray-500 dark:text-stone-300 font-bold">
              Great For:
            </h2>
            <ul className="flex-shrink-0 text-start text-gray-500  font-semibold">
              {place.placeGreatFors &&
                place.placeGreatFors.map((gf, index) => (
                  <li
                    key={index}
                    className=" mt-2 px-4 py-1 bg-slate-300 w-max rounded-full"
                  >
                    {gf.greatFor}
                  </li>
                ))}
            </ul>
          </div>
          <Link
            to={`${place.id}`}
            className="font-semibold text-lg underline text-gray-600 hover:text-blue-400 dark:text-stone-300 dark:hover:text-cyan-700 mt-2"
          >
            View Details
          </Link>
        </div>
      </div>
      <button onClick={handleAddPlace}>
        <BsCart
          className={`h-6 w-6  ${
            isSelected
              ? "text-emerald-400"
              : "text-gray-500 dark:text-stone-300"
          } hover:text-lime-500 dark:hover:text-lime-500 cursor-pointer`}
        />
      </button>
    </div>
  );
};

export default PlaceItem;
