import React, { useState, useEffect } from "react";
import FlightCard from "../Components/FlightCard";
import { useFetch } from "../Hooks/useFetch";
import { fetchAvailableFlights } from "../HelperFn/https";
import { FaSpinner } from "react-icons/fa";
import { Slider } from "@mui/material"; // Make sure to install @mui/material

const Flights = () => {
  const {
    fetchedData: flightData,
    isFetching,
    error,
  } = useFetch(fetchAvailableFlights, []);

  const [filteredFlights, setFilteredFlights] = useState([]);
  const [filters, setFilters] = useState({
    airline: "",
    priceRange: [0, 10000],
    date: "",
    returnDate: "",
    from: "",
    returnFrom: "",
    type: "",
  });

  useEffect(() => {
    if (flightData) {
      setFilteredFlights(flightData);
    }
  }, [flightData]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const filtered = flightData.filter((flight) => {
      return (
        (filters.airline === "" || flight.company === filters.airline) &&
        flight.price >= filters.priceRange[0] &&
        flight.price <= filters.priceRange[1] &&
        (filters.date === "" || flight.date === filters.date) &&
        (filters.returnDate === "" ||
          flight.returnDate === filters.returnDate) &&
        (filters.from === "" || flight.from === filters.from) &&
        (filters.returnFrom === "" ||
          flight.returnFrom === filters.returnFrom) &&
        (filters.type === "" || flight.type === filters.type)
      );
    });
    setFilteredFlights(filtered);
  };

  const uniqueValues = (key) => [
    ...new Set(flightData.map((flight) => flight[key])),
  ];

  return (
    <div className="container mx-auto">
      <div className="w-4/5 mx-auto max-w-5xl  mt-8 shadow-xl bg-stone-300/40 p-4 rounded-lg mb-8">
        <div className="flex flex-wrap  items-start justify-around max-w-full">
          <div className="mb-4 mr-4">
            <select
              id="airline"
              value={filters.airline}
              onChange={(e) => handleFilterChange("airline", e.target.value)}
              className="p-2 rounded bg-transparent"
            >
              <option value="">Select Airline</option>
              {uniqueValues("company").map((airline) => (
                <option key={airline} value={airline}>
                  {airline}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 mr-4">
            <label htmlFor="date" className="text-stone-600">
              Depart:
            </label>
            <input
              type="date"
              id="date"
              value={filters.date}
              onChange={(e) => handleFilterChange("date", e.target.value)}
              className="p-2 rounded bg-transparent"
            />
          </div>

          <div className="mb-4 mr-4">
            <label htmlFor="returnDate" className="text-stone-600">
              Return:
            </label>
            <input
              type="date"
              id="returnDate"
              value={filters.returnDate}
              onChange={(e) => handleFilterChange("returnDate", e.target.value)}
              className="p-2 rounded bg-transparent"
            />
          </div>

          <div className="mb-4 mr-4">
            <select
              id="from"
              value={filters.from}
              onChange={(e) => handleFilterChange("from", e.target.value)}
              className="p-2 rounded bg-transparent"
            >
              <option value="">Select From</option>
              {uniqueValues("from").map((from) => (
                <option key={from} value={from}>
                  {from}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 mr-4">
            <select
              id="returnFrom"
              value={filters.returnFrom}
              onChange={(e) => handleFilterChange("returnFrom", e.target.value)}
              className="p-2 rounded bg-transparent"
            >
              <option value="">Select Return From</option>
              {uniqueValues("returnFrom").map((returnFrom) => (
                <option key={returnFrom} value={returnFrom}>
                  {returnFrom}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 mr-4">
            <select
              id="type"
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className="p-2 rounded bg-transparent"
            >
              <option value="">Select Type</option>
              {uniqueValues("type").map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 w-full">
            <label className="text-stone-600">Price Range:</label>
            <Slider
              value={filters.priceRange}
              onChange={(_, newValue) =>
                handleFilterChange("priceRange", newValue)
              }
              valueLabelDisplay="auto"
              min={0}
              max={2000}
            />
            <div className="flex justify-between">
              <span>$ {filters.priceRange[0]}</span>
              <span>$ {filters.priceRange[1]}</span>
            </div>
          </div>

          <button
            onClick={applyFilters}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Apply Filters
          </button>
        </div>
      </div>

      <div className="w-full">
        {error && (
          <p className="mt-24 text-2xl text-red-500 font-semibold">
            Error: {error.message}
          </p>
        )}
        {isFetching && (
          <div className="flex items-center justify-center w-full h-full">
            <FaSpinner className="text-blue-500 animate-spin" size={50} />
          </div>
        )}
        {filteredFlights && filteredFlights.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold my-8"> Search Results</h2>
            {filteredFlights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Flights;
