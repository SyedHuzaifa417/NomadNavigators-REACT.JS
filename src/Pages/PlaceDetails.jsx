import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../src/Components/Loader";

const PlaceDetails = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://localhost:7266/api/Places/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const resData = await response.json();
        setPlace(resData);
      } catch (error) {
        setError(error.message);
        console.error("Failed to fetch place details:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (place && place.latitude && place.longitude) {
      const { latitude, longitude } = place;

      // Load the Google Maps API script dynamically
      const loadGoogleMapsAPI = () => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${
          import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY
        }`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        script.onload = () => {
          const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: latitude, lng: longitude },
            zoom: 12,
          });

          new window.google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: map,
            title: place.name,
          });
        };
      };

      if (window.google && window.google.maps) {
        loadGoogleMapsAPI();
      } else {
        // If Google Maps API script is not loaded, load it
        loadGoogleMapsAPI();
      }
    }
  }, [place]);

  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="place-details flex flex-col items-center">
      {place ? (
        <>
          <div className="w-full h-[60vh] bg-gray-200 overflow-hidden relative">
            <img
              src={`data:image/png;base64,${place.imageBase64}`}
              alt={place.name}
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h1 className="text-white/75 text-9xl font-bold">{place.name}</h1>
            </div>
          </div>

          <div className="w-full max-w-4xl p-6 bg-gray-100 shadow-2xl rounded-lg mt-4 relative z-10">
            <div className="flex justify-between mb-10">
              <p className="text-xl text-gray-600 flex gap-3 my-2">
                Country:{" "}
                <span className="text-2xl font-semibold text-gray-650">
                  {place.country}
                </span>
              </p>
              <p className="text-xl text-gray-600">
                Price per person:{" "}
                <span className="text-2xl font-semibold text-gray-650">
                  ${place.price}
                </span>
              </p>
            </div>
            <p className="text-xl flex justify-center text-gray-700 mb-2 gap-3">
              Liked By:{" "}
              <span className="text-gray-650 font-semibold text-2xl">
                {place.popularity}
              </span>{" "}
              Travellers
            </p>
            <p className="text-2xl text-gray-600 my-6">{place.description}</p>

            <div className="mt-8">
              <h3 className="text-3xl font-semibold text-gray-800">
                Great For:
              </h3>
              <div className="flex flex-wrap gap-2 mt-5">
                {place.placeGreatFors &&
                  place.placeGreatFors.map((gf, index) => (
                    <span
                      key={index}
                      className="bg-cyan-600 text-white px-3 py-1 rounded-full text-lg"
                    >
                      {gf.greatFor}
                    </span>
                  ))}
              </div>
            </div>

            <div className="mt-16 bg-gray-200 p-4 rounded-lg mb-9 shadow-xl">
              <h3 className="text-xl font-semibold text-gray-800">Location:</h3>
              <div
                ref={mapRef}
                className="w-full h-[300px] rounded-lg mt-2"
              ></div>
            </div>

            {place.restaurants && place.restaurants.length > 0 && (
              <div className="mt-4 w-max bg-gray-200 p-4 rounded-lg shadow-2xl">
                <h3 className="text-xl font-semibold text-gray-800">
                  Available Restaurants:
                </h3>
                <ul className="list-disc pl-5 mt-2">
                  {place.restaurants.map((restaurant) => (
                    <li key={restaurant.id} className="text-gray-700">
                      <div className="flex justify-between">
                        <p className="font-bold">{restaurant.restaurantName}</p>
                        <p className="italic font-thin text-slate-450 text-sm">
                          {restaurant.type}
                        </p>
                      </div>
                      <img
                        className="w-max h-52 my-3 object-cover"
                        src={`data:image/jpeg;base64,${restaurant.imageBase64}`}
                        alt={restaurant.restaurantName}
                      />
                      <p>{restaurant.rating} ⭐</p>
                      <p>
                        Speciality:{" "}
                        <span className="text-lg font-semibold text-slate-500">
                          {restaurant.speciality}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="mt-72">
          <div className="flex items-center justify-center w-full h-full">
            <FaSpinner className="text-blue-500 animate-spin" size={50} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceDetails;
