import React, { useEffect } from "react";
import "./Destinations.css";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { LiaClipboardListSolid } from "react-icons/lia";

import Aos from "aos";
import "aos/dist/aos.css";
import { useFetch } from "../../../Hooks/useFetch";
import { fetchAvailablePlaces } from "../../../HelperFn/https";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import Loader from "../../../Components/Loader";

const Destinations = () => {
  const navigate = useNavigate();
  const {
    fetchedData: places,
    error,
    isFetching,
  } = useFetch(fetchAvailablePlaces, []);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const getTopPlaces = (arr, limit = 9) => {
    return [...arr].sort((a, b) => b.popularity - a.popularity).slice(0, limit);
  };

  const handleClick = (id) => {
    navigate(`/Destinations/${id}`);
  };
  return (
    <section className="main section container">
      <div className="secTitle">
        <h3 data-aos="fade-right" className="title">
          Most Visited Destinations
        </h3>
      </div>
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
      <div className="secContent grid">
        {getTopPlaces(places).map((p) => {
          return (
            <div key={p.id} data-aos="fade-up" className="singleDestination">
              <div className="imageDiv">
                <img
                  src={`data:image/png;base64,${p.imageBase64}`}
                  alt={p.name}
                />
              </div>

              <div className="cardInfo">
                <h4 className="destTitle">{p.name}</h4>
                <span className="continent flex">
                  <HiOutlineLocationMarker className="icon" />
                  <span className="name">{p.country}</span>
                </span>

                <div className="fees flex">
                  <div className="grade">
                    <span>
                      {p.placeGreatFors.map((gf, index) => (
                        <span
                          key={index}
                          className="flex gap-2 py-1 px-2 ml-7 mb-2 bg-slate-300 w-max rounded-full"
                        >
                          {gf.greatFor}
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="price">
                    <h5>${p.price}</h5>
                  </div>
                </div>

                <div className="desc">
                  <p>{p.description}</p>
                </div>

                <button className="btn flex" onClick={() => handleClick(p.id)}>
                  DETAILS
                  <LiaClipboardListSolid className="icon" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Destinations;
