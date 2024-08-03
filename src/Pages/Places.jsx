import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useFetch } from "../Hooks/useFetch";
import { fetchAvailablePlaces } from "../HelperFn/https";
import PlaceItem from "../Components/PlaceItem";
import { IoCloseSharp } from "react-icons/io5";
import { getUserLocation, calculateDistance } from "../HelperFn/loc";
// import { FaSpinner } from "react-icons/fa";
import Loader from "../Components/Loader";

const GREAT_FOR_OPTIONS = [
  "nature",
  "culture",
  "destination wedding",
  "hiking",
  "beaches",
  "wildlife",
];

const Places = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState("");
  const [sortCriteria, setSortCriteria] = useState(null); // State for sorting criteria
  const [userLocation, setUserLocation] = useState(null);
  const [searchParams, setSearchParams] = useState({
    destination: "",
    price: 0,
  });

  const location = useLocation();

  const PLACES_PER_PAGE = 6;

  const {
    fetchedData: places,
    error,
    isFetching,
  } = useFetch(fetchAvailablePlaces, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchParams({
      destination: params.get("destination") || "",
      price: Number(params.get("price")) || 0,
    });
  }, [location]);

  useEffect(() => {
    getUserLocation(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error.message);
      }
    );
  }, []);

  const sortPlaces = (places, criteria) => {
    switch (criteria) {
      case "popularity":
        return [...places].sort((a, b) => b.popularity - a.popularity);
      case "price":
        return [...places].sort((a, b) => a.price - b.price);
      case "nearest":
        if (userLocation) {
          return [...places].sort(
            (a, b) =>
              calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                a.latitude,
                a.longitude
              ) -
              calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                b.latitude,
                b.longitude
              )
          );
        }
        return places;
      default:
        return places;
    }
  };

  const filteredPlaces = places.filter(
    (place) =>
      (searchParams.destination
        ? place.name
            .toLowerCase()
            .includes(searchParams.destination.toLowerCase())
        : true) &&
      (searchParams.price ? place.price <= searchParams.price : true) &&
      (filter
        ? place.placeGreatFors.some((gf) => gf.greatFor === filter)
        : true) //true will bypass the filter
  );

  const sortedAndFilteredPlaces = sortPlaces(filteredPlaces, sortCriteria);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    setSortCriteria(null);
    setCurrentPage(0);
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria); // Set sorting criteria
    setCurrentPage(0);
  };

  const clearAllFilters = () => {
    setFilter("");
    setSortCriteria(null);
    setCurrentPage(0);
  };

  const startIndex = currentPage * PLACES_PER_PAGE;

  const displayPlaces = sortedAndFilteredPlaces.slice(
    startIndex,
    startIndex + PLACES_PER_PAGE
  );

  return (
    <div className="flex flex-col gap-9 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row shadow-xl dark:shadow-stone-900 w-full bg-stone-300/40 dark:bg-stone-700 rounded-full justify-between p-3 gap-3 my-4 overflow-x-auto">
        <div className="flex flex-wrap justify-center sm:justify-start">
          <button
            onClick={() => handleSortChange("popularity")}
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              sortCriteria === "popularity"
                ? "text-cyan-500"
                : "text-stone-600 dark:text-stone-300 hover:text-cyan-500 dark:hover:text-cyan-500"
            }`}
          >
            Top Destinations
          </button>
          <button
            onClick={() => handleSortChange("price")}
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              sortCriteria === "price"
                ? "text-cyan-500"
                : "text-stone-600 dark:text-stone-300 hover:text-cyan-500 dark:hover:text-cyan-500"
            }`}
          >
            By Price
          </button>
          <button
            onClick={() => handleSortChange("nearest")}
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              sortCriteria === "nearest"
                ? "text-cyan-500"
                : "text-stone-600 dark:text-stone-300 hover:text-cyan-500 dark:hover:text-cyan-500"
            }`}
          >
            Nearest
          </button>
        </div>
        <div className="flex flex-wrap justify-center sm:justify-end">
          {GREAT_FOR_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => handleFilterChange(option)}
              className={`px-4 py-2 font-medium whitespace-nowrap ${
                filter === option
                  ? "text-cyan-500"
                  : "text-stone-600 dark:text-stone-300 hover:text-cyan-500 dark:hover:text-cyan-500"
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 font-bold rounded-md hover:scale-150 hover:text-cyan-500"
          >
            <IoCloseSharp />
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-24 text-2xl text-red-500 font-semibold">
          Error: {error.message}
        </p>
      )}
      {isFetching && <Loader />}
      {!isFetching && sortedAndFilteredPlaces.length === 0 && (
        <p className="mt-24 text-2xl text-gray-500 font-semibold text-center">
          No places found matching your criteria.
        </p>
      )}
      {!isFetching && sortedAndFilteredPlaces.length > 0 && (
        <div>
          {displayPlaces.map((place, index) => (
            <PlaceItem
              key={place.id}
              place={place}
              index={startIndex + index}
            />
          ))}
        </div>
      )}

      {places.length > PLACES_PER_PAGE && (
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={Math.ceil(places.length / PLACES_PER_PAGE)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={
            "flex justify-center lg:justify-end space-x-2 my-8 py-4"
          }
          pageClassName={"inline-block"}
          pageLinkClassName={
            "px-3 py-1  rounded-md hover:bg-cyan-800 hover:text-white"
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
          activeClassName={"bg-cyan-600 text-white rounded-lg"}
        />
      )}
    </div>
  );
};

export default Places;
