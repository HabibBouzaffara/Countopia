import React from "react";
import "./LandingPage.css";
import Section2 from "./section2/Section2";
import mainimg from "../../assets/main.svg";
import waves from "../../assets/waves.svg";
import Footer from "./footer/Footer";
import logo from "../../assets/LOGONOTITLE.svg";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box className='landing-page-container'>
      <Box width='95%' margin='2rem' paddingBottom='20px'>
        <div className='landing-page-text-container'>
          <div className='purple-1'>
            <div className='lading-page-navbar'>
              <div className='landing-page-navbar-logo'>
                <img
                  src={logo}
                  alt=''
                  style={{ width: "100px", marginRight: "10px" }}
                />{" "}
                <div className='landing-page-navbar-logo-text'> Countopia</div>
              </div>
              <div className='landing-page-navbar-button'>
                <div className='landing-page-navbar-link'>About Us</div>
                <div className='landing-page-navbar-link'>Features</div>
                <div className='landing-page-navbar-link'>Contacts Us</div>
                <div
                  onClick={() => navigate("/register")}
                  className='landing-page-navbar-navigate-signup'
                >
                  Register
                </div>
                <div
                  onClick={() => navigate("/login")}
                  className='landing-page-navbar-navigate-signin'
                >
                  Login
                </div>
              </div>
            </div>
            <div className='landing-page-buttons-container-1'>
              <div className='landing-page-buttons-btn1'>Expert</div>
              <div className='landing-page-buttons-btn2'>Assistant</div>
            </div>
            <div className='landing-page-slogan'>
              <div className='landing-page-slogan-text'>
                Easy way to manage your <br /> accounting
              </div>
            </div>
            <div className='landing-page-getstarted-btn'>
              <div className='landing-page-getstarted-btn-text'>
                Get Started
              </div>
            </div>

            <div className='landing-page-waves'>
              <img className='wave' src={waves} alt='' />
            </div>

            <div className='landing-page-images'>
              <img src={mainimg} alt='' />
            </div>
          </div>
        </div>
        <Section2 />
        <Footer />
      </Box>
    </Box>
  );
}
