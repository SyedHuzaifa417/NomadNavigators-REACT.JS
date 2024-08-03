import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";
import { GoPerson } from "react-icons/go";
import { PiSignOut } from "react-icons/pi";
import logo from "../../Assets/logo.png";
import Modal from "../../Components/Modal";
import Login from "../../Components/Login";
import Booking from "../Booking";
import { useTravelAuth } from "../../Hooks/useTravelAuth";
import ThemeToggle from "../../Components/ThemeBtn";
import "./navbar.css";

const Navbar = () => {
  const [active, setActive] = useState("navBar");
  const [modalContent, setModalContent] = useState(null);
  const { isLoggedIn, logout } = useTravelAuth();

  const showNavbar = () => setActive("navBar activeNavbar");
  const hideNavbar = () => setActive("navBar");

  const openModal = (content) => setModalContent(content);
  const closeModal = () => setModalContent(null);

  const handleAuthAction = async () => {
    if (isLoggedIn) {
      await logout();
    } else {
      openModal(<Login close={closeModal} />);
    }
  };

  const handleBookNowClick = () => {
    if (isLoggedIn) {
      openModal(<Booking close={closeModal} />);
    } else {
      openModal(<Login close={closeModal} />);
    }
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/Flights", label: "Flights" },
    { path: "/Destinations", label: "Destinations" },
    { path: "/Restaurants", label: "Restaurants" },
    { path: "/Reviews", label: "Reviews" },
    { path: "/About", label: "About" },
  ];

  return (
    <section className="navBarSection">
      <header className={`header flex`}>
        <div className="logoDiv flex items-center">
          <NavLink to="/" className="logo flex items-center">
            <img src={logo} alt="logo" className="logos" />
            <h1 className="text-lg font-bold">Nomad Navigators.</h1>
          </NavLink>
        </div>

        <div className={active}>
          <ul className="navLists flex">
            {navItems.map((item) => (
              <li key={item.path} className="navItem">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? "on" : "navLink")}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <button className="btn text-white" onClick={handleBookNowClick}>
              BOOK NOW
            </button>
            <button className="px-3 ml-5 py-2" onClick={handleAuthAction}>
              {isLoggedIn ? (
                <PiSignOut className="w-10 h-7 hover:scale-125 text-slate-600" />
              ) : (
                <GoPerson className="w-10 h-7 hover:scale-125 text-slate-600" />
              )}
            </button>
          </ul>

          <div className="closeNavbar" onClick={hideNavbar}>
            <IoIosCloseCircle className="icon" />
          </div>
        </div>

        <div className="toggleNavbar" onClick={showNavbar}>
          <TbGridDots className="icon" />
        </div>
      </header>

      {modalContent && (
        <Modal open={!!modalContent} onClose={closeModal}>
          {modalContent}
        </Modal>
      )}
    </section>
  );
};

export default Navbar;
