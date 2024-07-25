import React from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { LiaPlaneArrivalSolid, LiaPlaneDepartureSolid } from "react-icons/lia";
import { useTravelAuth } from "../Hooks/useTravelAuth";
import { BsCart } from "react-icons/bs";

const FlightCard = ({ flight }) => {
  const { selectedFlight, setSelectedFlight } = useTravelAuth();

  const isSelected = selectedFlight && selectedFlight.id === flight.id;

  function handleAddFlight() {
    setSelectedFlight(isSelected ? null : flight);
  }

  const calculateDuration = (departure, arrival) => {
    const dep = new Date(`2000-01-01T${departure}`);
    const arr = new Date(`2000-01-01T${arrival}`);
    const diff = arr - dep;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
  };

  const outboundDuration = calculateDuration(
    flight.departureTime,
    flight.arrivalTime
  );
  const returnDuration = calculateDuration(
    flight.returnDepartureTime,
    flight.returnArrivalTime
  );

  const FlightRow = ({ dep, arr, from, Icon, to, duration, company }) => (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center w-24 ">
        <Icon className="w-6 h-6 mr-4" />

        <span className="text-medium font-semibold">{company}</span>
      </div>
      <div className="w-px h-16 bg-gray-500 mx-4"></div>
      <div className="text-center">
        <p className="text-lg font-bold">{dep.slice(0, 5)}</p>
        <p className="text-xs text-gray-500">{from.split(",")[0]}</p>
      </div>

      <div className="flex flex-col items-center w-32">
        <div className="w-full h-0.5 bg-gray-300 relative">
          <div className="absolute -top-1 right-0 w-2 h-2 bg-gray-300 transform rotate-45"></div>
        </div>
        <span className="text-xs text-gray-500 mt-1">{duration}</span>
      </div>
      <div className="text-center">
        <p className="text-lg font-bold">{arr.slice(0, 5)}</p>
        <p className="text-xs text-gray-500">{to.split(",")[0]}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
      {/* <div className="flex justify-end mb-2">
        <HeartIcon className="h-6 w-6 text-gray-400 hover:text-red-500 cursor-pointer" />
      </div> */}
      <div onClick={handleAddFlight} className="flex justify-end mb-2">
        <BsCart
          className={`h-6 w-6  ${
            isSelected ? "text-emerald-400" : "text-gray-500"
          } hover:text-lime-500 cursor-pointer`}
        />
      </div>

      <FlightRow
        dep={flight.departureTime}
        arr={flight.arrivalTime}
        from={flight.from}
        Icon={LiaPlaneDepartureSolid}
        to={flight.to}
        duration={outboundDuration}
        company={flight.company}
      />

      <FlightRow
        dep={flight.returnDepartureTime}
        arr={flight.returnArrivalTime}
        from={flight.returnFrom}
        Icon={LiaPlaneArrivalSolid}
        to={flight.returnTo}
        duration={returnDuration}
        company={flight.returnCompany}
      />

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">
          {flight.date} <span className="font-bold text-slate-800">-</span>{" "}
          {flight.returnDate}
        </p>
        <div className="flex  items-center">
          <div className="text-right mr-4">
            <p className="text-xs text-gray-500">1 deal from</p>
            <p className="text-xl font-bold text-blue-600">
              $ {flight.price.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
