// import { fetchAvailablePlaces } from "../HelperFn/https";

// export async function placesLoader() {
//   try {
//     const places = await fetchAvailablePlaces();
//     return places;
//   } catch (error) {
//     throw new Response("Failed to fetch places", { status: 500 });
//   }
// }

// import React, { useEffect, useState } from "react";
// import ReactPaginate from "react-paginate";
// import { useLoaderData, useRouteError } from "react-router-dom"; // Import useLoaderData and useRouteError
// import PlaceItem from "../Components/PlaceItem";
// import { IoCloseSharp } from "react-icons/io5";
// import { getUserLocation, calculateDistance } from "../HelperFn/loc";
// import { FaSpinner } from "react-icons/fa";

// // Define the options for filtering
// const GREAT_FOR_OPTIONS = [
//   "nature",
//   "culture",
//   "destination wedding",
//   "hiking",
//   "beaches",
//   "wildlife",
// ];

// const Places = () => {
//   const [currentPage, setCurrentPage] = useState(0);
//   const [filter, setFilter] = useState(""); // State for filtering "Great For"
//   const [sortCriteria, setSortCriteria] = useState(null); // State for sorting criteria
//   const [userLocation, setUserLocation] = useState(null);

//   const PLACES_PER_PAGE = 6;

//   // Use the loader data
//   const places = useLoaderData();
//   const error = useRouteError(); // Get error from useRouteError

//   const [sortedAndFilteredPlaces, setSortedAndFilteredPlaces] = useState([]);
//   const [isLoading, setIsLoading] = useState(true); // Loading state

//   useEffect(() => {
//     if (places) {
//       setIsLoading(false); // Set loading to false when data is loaded
//     }
//   }, [places]);

//   useEffect(() => {
//     getUserLocation(
//       (position) => {
//         setUserLocation({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//       },
//       (error) => {
//         console.error(error.message);
//       }
//     );
//   }, []);

//   useEffect(() => {
//     if (places) {
//       const filteredPlaces = filter
//         ? places.filter((place) =>
//             place.placeGreatFors.some((gf) => gf.greatFor === filter)
//           )
//         : places;

//       const sortedPlaces = sortPlaces(filteredPlaces, sortCriteria);
//       setSortedAndFilteredPlaces(sortedPlaces);
//     }
//   }, [places, filter, sortCriteria, userLocation]);

//   const sortPlaces = (places, criteria) => {
//     switch (criteria) {
//       case "popularity":
//         return [...places].sort((a, b) => b.popularity - a.popularity);
//       case "price":
//         return [...places].sort((a, b) => a.price - b.price);
//       case "nearest":
//         if (userLocation) {
//           return [...places].sort(
//             (a, b) =>
//               calculateDistance(
//                 userLocation.latitude,
//                 userLocation.longitude,
//                 a.latitude,
//                 a.longitude
//               ) -
//               calculateDistance(
//                 userLocation.latitude,
//                 userLocation.longitude,
//                 b.latitude,
//                 b.longitude
//               )
//           );
//         }
//         return places;
//       default:
//         return places;
//     }
//   };

//   const handlePageClick = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   const handleFilterChange = (value) => {
//     setFilter(value);
//     setSortCriteria(null); // Clear sorting criteria when filtering
//     setCurrentPage(0);
//   };

//   const handleSortChange = (criteria) => {
//     setSortCriteria(criteria); // Set sorting criteria
//     setCurrentPage(0);
//   };

//   const clearAllFilters = () => {
//     setFilter("");
//     setSortCriteria(null);
//     setCurrentPage(0);
//   };

//   const startIndex = currentPage * PLACES_PER_PAGE;

//   const displayPlaces = sortedAndFilteredPlaces.slice(
//     startIndex,
//     startIndex + PLACES_PER_PAGE
//   );

//   return (
//     <div className="flex flex-col md:flex-col gap-9">
//       <div className="flex shadow-xl w-[70%] bg-stone-300/40 rounded-full justify-between p-3 gap-3 my-4 ">
//         <div>
//           <button
//             onClick={() => handleSortChange("popularity")}
//             className={`px-4 py-2 font-medium ${
//               sortCriteria === "popularity"
//                 ? "text-cyan-500"
//                 : "text-stone-600 hover:text-cyan-500"
//             }`}
//           >
//             Top Destinations
//           </button>
//           <button
//             onClick={() => handleSortChange("price")}
//             className={`px-4 py-2 font-medium ${
//               sortCriteria === "price"
//                 ? "text-cyan-500"
//                 : "text-stone-600 hover:text-cyan-500"
//             }`}
//           >
//             By Price
//           </button>
//           <button
//             onClick={() => handleSortChange("nearest")}
//             className={`px-4 py-2 font-medium ${
//               sortCriteria === "nearest"
//                 ? "text-cyan-500"
//                 : "text-stone-600 hover:text-cyan-500"
//             }`}
//           >
//             Nearest
//           </button>
//         </div>
//         <div>
//           {GREAT_FOR_OPTIONS.map((option) => (
//             <button
//               key={option}
//               onClick={() => handleFilterChange(option)}
//               className={`px-4 py-2 font-medium ${
//                 filter === option
//                   ? "text-cyan-500"
//                   : "text-stone-600 hover:text-cyan-500"
//               }`}
//             >
//               {option.charAt(0).toUpperCase() + option.slice(1)}
//             </button>
//           ))}

//           <button
//             onClick={clearAllFilters}
//             className="px-4 py-2 font-bold rounded-md hover:scale-150"
//           >
//             <IoCloseSharp />
//           </button>
//         </div>
//       </div>

//       {error && (
//         <p className="mt-24 text-2xl text-red-500 font-semibold">
//           Error: {error.message || "Failed to load data"}
//         </p>
//       )}
//       {isLoading && !error && (
//         <FaSpinner className="text-blue-500 animate-spin" size={50} />
//       )}
//       {places && places.length > 0 && (
//         <div>
//           {displayPlaces.map((place, index) => (
//             <PlaceItem
//               key={place.id}
//               place={place}
//               index={startIndex + index}
//             />
//           ))}
//         </div>
//       )}

//       {places.length > PLACES_PER_PAGE && (
//         <ReactPaginate
//           previousLabel={"Prev"}
//           nextLabel={"Next"}
//           breakLabel={"..."}
//           pageCount={Math.ceil(places.length / PLACES_PER_PAGE)}
//           marginPagesDisplayed={2}
//           pageRangeDisplayed={5}
//           onPageChange={handlePageClick}
//           containerClassName={"flex justify-end space-x-2 mr-32 my-32 py-9"}
//           pageClassName={"inline-block"}
//           pageLinkClassName={
//             "px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200"
//           }
//           previousClassName={"inline-block"}
//           previousLinkClassName={
//             "px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200"
//           }
//           nextClassName={"inline-block"}
//           nextLinkClassName={
//             "px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200"
//           }
//           breakClassName={"inline-block break-me"}
//           breakLinkClassName={
//             "px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200"
//           }
//           activeClassName={"bg-blue-500 text-white"}
//         />
//       )}
//     </div>
//   );
// };

// export default Places;
