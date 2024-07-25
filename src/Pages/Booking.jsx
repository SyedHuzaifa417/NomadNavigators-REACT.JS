import React, { useState, useEffect } from "react";
import { useTravelAuth } from "../Hooks/useTravelAuth";

const Booking = ({ close }) => {
  const { selectedPlace, selectedFlight } = useTravelAuth();
  const [formData, setFormData] = useState({
    bookerName: "",
    bookerEmail: "",
    bookingDate: "",
    bookingTime: "",
    placeId: "",
    flightId: "",
    restaurantId: "",
    numberOfPersons: 1,
    totalPrice: 0,
  });

  const [places, setPlaces] = useState([]);
  const [flights, setFlights] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState({
    places: true,
    flights: true,
    restaurants: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [placesRes, flightsRes, restaurantsRes] = await Promise.all([
          fetch("https://localhost:7266/api/Places"),
          fetch("https://localhost:7266/api/Flights"),
          fetch("https://localhost:7266/api/Restaurants"),
        ]);
        const placesData = await placesRes.json();
        const flightsData = await flightsRes.json();
        const restaurantsData = await restaurantsRes.json();
        setPlaces(placesData);
        setFlights(flightsData);
        setRestaurants(restaurantsData);
        setLoading({
          places: false,
          flights: false,
          restaurants: false,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading({
          places: false,
          flights: false,
          restaurants: false,
        });
      }
    };

    fetchData();
  }, []);

  const validateForm = () => {
    if (!formData.bookerName || !formData.bookerEmail) {
      setError("Booker name and email are required.");
      return false;
    }
    if (!formData.placeId || !formData.flightId || !formData.numberOfPersons) {
      setError("Place, Flight, and Number of Persons are required.");
      return false;
    }
    return true;
  };
  useEffect(() => {
    if (selectedPlace) {
      setFormData((prev) => ({
        ...prev,
        placeId: selectedPlace.id.toString(),
      }));
      const filteredRestaurants = restaurants.filter(
        (r) => r.placeId === selectedPlace.id
      );
      setFilteredRestaurants(filteredRestaurants);
    }
  }, [selectedPlace, restaurants]);

  useEffect(() => {
    if (selectedFlight) {
      setFormData((prev) => ({
        ...prev,
        flightId: selectedFlight.id.toString(),
      }));
    }
  }, [selectedFlight]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "placeId") {
      const selectedPlace = places.find((p) => p.id === parseInt(value));
      if (selectedPlace) {
        setFilteredRestaurants(
          restaurants.filter((r) => r.placeId === selectedPlace.id)
        );
      } else {
        setFilteredRestaurants([]);
      }
      setFormData((prev) => ({ ...prev, restaurantId: "" })); //to handle place change
    }
  };

  const calculateTotalPrice = () => {
    const place = places.find((p) => p.id === parseInt(formData.placeId));
    const flight = flights.find((f) => f.id === parseInt(formData.flightId));
    const restaurant = restaurants.find(
      (r) => r.id === parseInt(formData.restaurantId)
    );

    let total = 0;
    if (place) total += place.price;
    if (flight) total += flight.price;
    if (restaurant) total += restaurant.price;
    total *= formData.numberOfPersons;
    setFormData((prev) => ({ ...prev, totalPrice: total }));
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [
    formData.placeId,
    formData.flightId,
    formData.restaurantId,
    formData.numberOfPersons,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!validateForm()) {
      return;
    }

    const formattedTime = formData.bookingTime
      ? new Date(`2000-01-01T${formData.bookingTime}`)
          .toTimeString()
          .split(" ")[0]
      : null;

    const bookingInput = {
      bookerName: formData.bookerName,
      bookerEmail: formData.bookerEmail,
      bookingDate: formData.bookingDate,
      bookingTime: formattedTime,
      placeId: parseInt(formData.placeId),
      flightId: parseInt(formData.flightId),
      restaurantId: formData.restaurantId
        ? parseInt(formData.restaurantId)
        : null,
      numberOfPersons: parseInt(formData.numberOfPersons),
      totalPrice: formData.totalPrice,
    };

    try {
      const response = await fetch("https://localhost:7266/api/Bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingInput),
      });

      const responseText = await response.text();

      if (response.ok) {
        setBooked(true);
      } else {
        console.error("Error response:", response.status, responseText);
        try {
          const errorData = JSON.parse(responseText);
          setError(
            errorData.title ||
              "An error occurred while booking. Please try again."
          );
        } catch {
          setError(`Server error: ${response.status}. ${responseText}`);
        }
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gray-900 text-white rounded-lg p-6 w-full max-w-md max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Make Your Reservation</h2>
          <button className="text-white hover:text-gray-400" onClick={close}>
            &times;
          </button>
        </div>
        {error && (
          <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>
        )}
        {booked ? (
          <p>Your Booking is successfully made.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="bookerName"
              placeholder="Name"
              value={formData.bookerName}
              className="w-full bg-gray-800 rounded p-2 mb-2"
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="bookerEmail"
              placeholder="Email"
              value={formData.bookerEmail}
              className="w-full bg-gray-800 rounded p-2 mb-2"
              onChange={handleInputChange}
              required
            />
            <div className="flex gap-2 mb-2">
              <input
                type="date"
                name="bookingDate"
                value={formData.bookingDate}
                className="w-1/2 bg-gray-800 rounded p-2"
                onChange={handleInputChange}
                required
              />
              <input
                type="time"
                name="bookingTime"
                value={formData.bookingTime}
                className="w-1/2 bg-gray-800 rounded p-2"
                onChange={handleInputChange}
                required
              />
            </div>
            <select
              name="placeId"
              value={formData.placeId}
              className="w-full bg-gray-800 rounded p-2 mb-2"
              onChange={handleInputChange}
              required
            >
              <option value="">
                {loading.places ? "Loading places..." : "Select Place"}
              </option>
              {places.map((place) => (
                <option key={place.id} value={place.id}>
                  {place.name}
                </option>
              ))}
            </select>
            <select
              name="flightId"
              value={formData.flightId}
              className="w-full bg-gray-800 rounded p-2 mb-2"
              onChange={handleInputChange}
              required
            >
              <option value="">
                {loading.flights ? "Loading flights..." : "Flight to"}
              </option>
              {flights.map((flight) => (
                <option key={flight.id} value={flight.id}>
                  {flight.to} ({flight.company})
                </option>
              ))}
            </select>
            <select
              name="restaurantId"
              value={formData.restaurantId}
              className="w-full bg-gray-800 rounded p-2 mb-2"
              onChange={handleInputChange}
              disabled={!formData.placeId}
            >
              <option value="">
                {loading.restaurants
                  ? "Loading restaurants..."
                  : formData.placeId
                  ? "Select Restaurant (Optional)"
                  : "Select a place first"}
              </option>
              {filteredRestaurants.map((restaurant) => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.restaurantName}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="numberOfPersons"
              placeholder="Number of Persons"
              value={formData.numberOfPersons}
              min="1"
              className="w-full bg-gray-800 rounded p-2 mb-2"
              onChange={handleInputChange}
              required
            />
            <p className="mb-4">
              Total Price: ${formData.totalPrice.toFixed(2)}
            </p>
            <button
              type="submit"
              className="w-full bg-cyan-600 text-white rounded p-2 font-bold hover:bg-cyan-800 transition-colors"
            >
              BOOK NOW
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Booking;
