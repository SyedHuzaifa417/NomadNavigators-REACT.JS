import React, { useEffect, useState } from "react";
import "./footer.css";
import video2 from "../../../Assets/video2.mp4";
import { FiSend } from "react-icons/fi";
import { MdOutlineTravelExplore } from "react-icons/md";
import { FaSquareXTwitter } from "react-icons/fa6";
import { AiFillYoutube } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { FaTripadvisor } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { partnerRequest } from "../../../HelperFn/https"; // Adjust the import path as needed

import Aos from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter an email address.");
      return;
    }

    try {
      const response = await partnerRequest({
        name: "contactMe",
        email: email,
        contact: email,
        areaOfInterest: "contact",
        country: "world",
      });
      setIsSubmitted(true);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="footer">
      <div className="videoDiv">
        <video src={video2} loop autoPlay muted typeof="video/mp4"></video>
      </div>

      <div className="secContent container">
        <div className="contactDiv flex">
          <div data-aos="fade-up" className="text">
            <small>KEEP IN TOUCH</small>
            <h2>Travel with us</h2>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="inputDiv flex">
              <input
                data-aos="fade-up"
                type="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button data-aos="fade-up" className="btn flex" type="submit">
                SEND <FiSend className="icon" />
              </button>
            </form>
          ) : (
            <div data-aos="fade-up" className="successMessage">
              Email address is sent successfully. We will contact you shortly.
            </div>
          )}

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        <div className="footerCard flex">
          <div className="footerIntro flex">
            <div className="logoDiv">
              <a href="#" className="logo flex">
                <MdOutlineTravelExplore className="icon" /> Nomad Navigators.
              </a>
            </div>

            <div data-aos="fade-up" className="footerParagraph">
              Our mission is to be the leading and most trustworthy travel
              management company that sets the standard for professionalism,
              reliability and transparency to its customers.
            </div>

            <div data-aos="fade-up" className="footerSocials flex">
              <a href="https://x.com/@SyedHuz71489708" target="_blank">
                <FaSquareXTwitter className="icon" />
              </a>
              <a href="https://www.youtube.com/" target="_blank">
                <AiFillYoutube className="icon" />
              </a>
              <a
                href="https://www.instagram.com/huzaifa417?igsh=MTVkcDhwaHR3ejl3Mw%3D%3D&utm_source=qr"
                target="_blank"
              >
                <AiFillInstagram className="icon" />
              </a>
              <a href="https://www.tripadvisor.com/" target="_blank">
                <FaTripadvisor className="icon" />
              </a>
            </div>
          </div>

          <div className="footerLinks grid">
            {/* group1 */}
            <div
              data-aos="fade-up"
              data-aos-duration="3000"
              className="linkGroup"
            >
              <span className="groupTitle">OUR AGENCY</span>

              <li className="footerList flex">
                <FaChevronRight className="icon" />
                <Link to="/workInProgress">Services</Link>
              </li>

              <li className="footerList flex">
                <FaChevronRight className="icon" />
                <Link to="/workInProgress">Agency</Link>
              </li>

              <li className="footerList flex">
                <FaChevronRight className="icon" />
                <Link to="/workInProgress">Insurance</Link>
              </li>

              <li className="footerList flex">
                <FaChevronRight className="icon" />
                <Link to="/workInProgress">Tourism</Link>
              </li>

              <li className="footerList flex">
                <FaChevronRight className="icon" />
                <Link to="/workInProgress">Payment</Link>
              </li>
            </div>

            {/* {group2} */}
            <div
              data-aos="fade-up"
              data-aos-duration="4000"
              className="linkGroup"
            >
              <span className="groupTitle">PARTNERS</span>

              <li className="footerList flex">
                <FaChevronRight className="icon" />
                <Link to="/workInProgress">BookMe</Link>
              </li>

              <li className="footerList flex">
                <FaChevronRight className="icon" />
                <Link to="/workInProgress">iMusafir</Link>
              </li>

              <li className="footerList flex">
                <FaChevronRight className="icon" />
                <Link to="/workInProgress">Indus Guides</Link>
              </li>

              <li className="footerList flex">
                <FaChevronRight className="icon" />
                <Link to="/workInProgress">Exploria</Link>
              </li>

              <li className="footerList flex">
                <FaChevronRight className="icon" />
                <Link to="/workInProgress">Rock Valley</Link>
              </li>
            </div>

            {/* group3 */}
            <div
              data-aos="fade-up"
              data-aos-duration="5000"
              className="linkGroup"
            >
              <span className="groupTitle">LAST MINUTE</span>

              <li className="footerList flex">
                <FaChevronRight className="icon" />
                <Link to="/workInProgress">London</Link>
              </li>

              <li className="footerList flex">
                <FaChevronRight className="icon" />
                <Link to="/workInProgress">California</Link>
              </li>

              <li className="footerList flex">
                <FaChevronRight className="icon" />
                <Link to="/workInProgress">Indonesia</Link>
              </li>

              <li className="footerList flex">
                <FaChevronRight className="icon" />
                <Link to="/workInProgress">Maldives</Link>
              </li>

              <li className="footerList flex">
                <FaChevronRight className="icon" />
                <Link to="/workInProgress">Europe</Link>
              </li>
            </div>
          </div>

          <div className="footerDiv flex">
            <small>BEST TRAVEL WEBSITE</small>
            <small>&copy;2024 COPYRIGHTS RESERVED - SYED HUZAIFA BUKHARI</small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
