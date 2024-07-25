import React from "react";
import { useFetch } from "../Hooks/useFetch";
import { fetchAvailableRestaurants } from "../HelperFn/https";
import RestaurantItem from "../Components/RestaurantItem";
import restaurantImg from "../Assets/restaurant.jpg";
import Footer from "../Pages/Home/Footer/Footer";
import Loader from "../Components/Loader";

const RestaurantSection = ({ title, restaurants }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <div className="flex flex-wrap -mx-4">
      {restaurants.map((restaurant) => (
        <RestaurantItem key={restaurant.id} restrnt={restaurant} />
      ))}
    </div>
  </div>
);

const Restaurants = () => {
  const {
    fetchedData: restaurants,
    isFetching,
    error,
  } = useFetch(fetchAvailableRestaurants, []);

  const getTopRestaurants = (arr, key, order = "desc", limit = 4) => {
    return [...arr]
      .sort((a, b) => (order === "desc" ? b[key] - a[key] : a[key] - b[key]))
      .slice(0, limit);
  };
  //with chatgpt help
  const getTopTypes = (arr, limit = 4) => {
    const types = arr.reduce((acc, restaurant) => {
      acc[restaurant.type] = (acc[restaurant.type] || []).concat(restaurant);
      return acc;
    }, {});
    return Object.entries(types)
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, limit)
      .map(([type, restaurants]) => ({
        type,
        restaurants: restaurants.slice(0, 4),
      }));
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      <img
        src={restaurantImg}
        alt="Dining Room"
        className="w-full h-96 object-cover opacity-90 mb-24"
      />

      <div className="flex flex-col items-center justify-center w-full flex-1 mt-4 mb-16">
        {error && (
          <p className="mt-24 text-2xl text-red-500 font-semibold">
            Error: {error.message}
          </p>
        )}
        {isFetching && <Loader />}
        {restaurants && restaurants.length > 0 && (
          <div className="container mx-auto px-4 mt-4">
            <RestaurantSection
              title="Top Rated"
              restaurants={getTopRestaurants(restaurants, "rating")}
            />

            <RestaurantSection
              title="Best Deals"
              restaurants={getTopRestaurants(restaurants, "price", "asc")}
            />

            {getTopTypes(restaurants).map(({ type, restaurants }) => (
              <RestaurantSection
                key={type}
                title={`Top ${type}`}
                restaurants={restaurants}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Restaurants;
