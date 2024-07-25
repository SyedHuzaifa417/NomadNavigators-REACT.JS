import React, { useEffect, useState } from "react";
import "./Search.css";
import video from "../../../Assets/video.mp4";
import { GrLocation } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaTripadvisor } from "react-icons/fa";
import Aos from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [price, setPrice] = useState(0);
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const handleSearch = () => {
    navigate(`/Destinations?destination=${destination}&price=${price}`);
  };

  return (
    <section className="home">
      <div className="overlay"></div>
      <video src={video} muted autoPlay loop type="video/mp4"></video>

      <div className="homeContent container">
        <div className="textDiv">
          <span data-aos="fade-up" className="smallText">
            Our Packages
          </span>
          <h1 data-aos="fade-up" className="homeTitle">
            Search Your Holiday
          </h1>
        </div>

        <div data-aos="fade-up" className="cardDiv grid">
          <div className="destinationInput">
            <label htmlFor="city">Search your destination:</label>
            <div className="input flex text-slate-500">
              <input
                type="text"
                placeholder="Enter name here..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
              <GrLocation className="icon" />
            </div>
          </div>
          <div className="dateInput">
            <label htmlFor="date">Select your date:</label>
            <div className="input flex text-slate-500">
              <input type="date" />
            </div>
          </div>
          <div className="priceInput">
            <div className="label_total flex">
              <label htmlFor="price">Max Price: &nbsp; </label>
              <h3 className="total">${price}</h3>
            </div>
            <div className="input flex">
              <input
                type="range"
                max="1000"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="searchOptions flex" onClick={handleSearch}>
            <FaSearch className="icon" />
            <span>Search</span>
          </div>
        </div>

        <div data-aos="fade-up" className="homeFooterIcons flex">
          <div className="rightIcons flex">
            <a
              href="https://www.facebook.com/muhammadhuzaifa.ali.7?mibextid=LQQJ4d"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiFacebook className="icon" />
            </a>
            <a
              href="https://www.instagram.com/huzaifa417?igsh=MTVkcDhwaHR3ejl3Mw%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiOutlineInstagram className="icon" />
            </a>
            <a
              href="https://www.tripadvisor.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTripadvisor className="icon" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
