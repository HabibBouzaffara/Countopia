import React from "react";
import FooterCards from "components/footer-cards/FooterCards";
import facebook from "../../../assets/facebook.svg";
import instagram from "../../../assets/instagram.svg";
import whatsapp from "../../../assets/whatsapp.svg";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
export default function Footer() {
  const navigate = useNavigate();
  return (
    <div className='landing-page-footer-container'>
      <div className='landing-page-footer-logo-nav'>
        <div className='landing-page-navbar-logo'>Countopia</div>
        <div className='landing-page-footer-nav'>
          <FooterCards
            title={"Assistance"}
            links={["About Us", "Features", "Contact Us"]}
          />
          <FooterCards
            title={"Community"}
            links={["About Us", "Features", "Contact Us"]}
          />
          <FooterCards
            title={"Company"}
            links={["About Us", "Features", "Contact Us"]}
          />
          <div className='landing-page-footer-nav-btns'>
            <div
              onClick={() => navigate("/register")}
              className='landing-page-navbar-navigate-signup footer-register'
            >
              Register
            </div>
            <div
              onClick={() => navigate("/login")}
              className='landing-page-navbar-navigate-signin footer-login'
            >
              Login
            </div>
          </div>
        </div>
      </div>
      <div className='landing-page-footer-social'>
        <div className='landing-page-footer-inc'>
          © Inc. 2024. We love our users!
        </div>
        <div className='landing-page-footer-social-icons'>
          <div className='landing-page-footer-contactus'>contact us:</div>
          <img src={facebook} alt='' />
          <img src={instagram} alt='' />
          <img src={whatsapp} alt='' />
        </div>
      </div>
    </div>
  );
}
