import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../Components/Modal";
import Footer from "./Home/Footer/Footer";
import Travel from "../Assets/About/Travel.jpg";
import Partners from "../Assets/About/Partner.jpeg";
import airbnb from "../Assets/About/airbnb.jpg";
import Expedia from "../Assets/About/expedia.jpg";
import fareboom from "../Assets/About/fareboom.png";
import Luflhansa from "../Assets/About/lufthansa.jpg";
import TripAdvisor from "../Assets/About/Tripadvisor.png";
import Mate from "../Assets/About/travelMate.jpg";
import travel from "../Assets/About/travel.png";
import trivago from "../Assets/About/trivago.png";
import access from "../Assets/About/access.jpeg";
import Agency from "../Assets/About/Agency.jpg";
import globe from "../Assets/About/globe.png";
import viet from "../Assets/About/viet.jpg";
import elle from "../Assets/About/elle.jpg";
import trip from "../Assets/About/tripadvisor-logo.jpg";
import aboutBG from "../Assets/About/aboutbg.png";
import SliderFn from "../Components/Slider";
import Partner from "../Components/Partner";

const About = () => {
  const [openModal, setopenModal] = useState(false);

  const closeModal = () => {
    setopenModal(false);
  };

  return (
    <>
      <div className="relative py-20 sm:py-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center">
            <h1 className="text-center font-bold text-cyan-800 dark:text-cyan-400 font-serif text-3xl sm:text-5xl mb-8 sm:mb-0 sm:mr-8 z-10">
              Get to Know Us!
            </h1>
            <img
              src={aboutBG}
              alt="topImg"
              className="w-3/4 sm:w-1/3 lg:w-1/5 mt-4 sm:mt-0 sm:absolute sm:top-1/2 sm:right-8 lg:right-48 sm:-translate-y-1/2"
            />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div className="flex flex-col md:flex-row mb-11">
          <div className="partner-section mb-8 md:mb-0 md:mr-14 flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-5">
              <img
                src={Travel}
                alt="Travelers"
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
            <div className="w-full md:w-2/3">
              <Link to="/">
                <h3 className="text-2xl font-semibold text-cyan-600 dark:text-cyan-300 leading-relaxed tracking-wide hover:text-cyan-800 dark:hover:text-cyan-600 mb-2">
                  Travel With Us →
                </h3>
              </Link>
              <p className="text-gray-600 dark:text-slate-300">
                No matter who you are, or where you are going, our travel brands
                help every type of traveler not only find the trip that's right
                for them, but get the best value every time.
              </p>
            </div>
          </div>
          <div className="partner-section md:ml-14 flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-5">
              <img
                src={Partners}
                alt="Business Partners"
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
            <div className="w-full md:w-2/3">
              <button onClick={() => setopenModal(true)}>
                <h3 className="text-2xl font-semibold text-cyan-600 dark:text-cyan-300 leading-relaxed tracking-wide hover:text-cyan-800 dark:hover:text-cyan-600 mb-2">
                  Partner With Us →
                </h3>
              </button>
              <p className="text-gray-600 dark:text-slate-300">
                We connect partners big and small to the universe of travelers,
                giving access to data, tools and technology that empowers,
                maximizes potential and builds their business.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center pt-16">
          {[
            Expedia,
            airbnb,
            fareboom,
            Luflhansa,
            travel,
            TripAdvisor,
            trivago,
            Mate,
            elle,
            viet,
            access,
            Agency,
            trip,
            globe,
          ].map((brand, index) => (
            <div key={index} className="w-1/3 sm:w-1/4 md:w-1/6 lg:w-1/7 p-2">
              <img
                src={brand}
                alt={`Brand ${index + 1}`}
                className="w-full h-16 object-contain mb-2 mix-blend-multiply"
              />
            </div>
          ))}
        </div>
      </div>
      <hr className="border-t-4 border-sky-600/25 my-8 mx-auto w-3/4" />
      <div className="text-center p-8 md:p-28 relative">
        <h1 className="pb-10 md:pb-20 font-semibold font-sans text-3xl md:text-5xl text-slate-800 dark:text-cyan-500">
          Client Testimonials
        </h1>
        <SliderFn />
      </div>
      <Modal open={openModal} onClose={closeModal}>
        <Partner close={closeModal} />
      </Modal>
      <Footer />
    </>
  );
};

export default About;
