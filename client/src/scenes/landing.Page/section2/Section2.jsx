import React from "react";
import "./Section2.css";
import Card from "components/landing-page-cards/Card";
import tech1 from "../../../assets/tech1.svg";
import tech2 from "../../../assets/tech2.svg";
import tech3 from "../../../assets/tech3.svg";
import tech4 from "../../../assets/tech4.svg";
import tech5 from "../../../assets/tech5.svg";
import card from "../../../assets/card1.png";
import card2 from "../../../assets/card2.png";
import card3 from "../../../assets/card3.png";

export default function Section2() {
  return (
    <>
      
      <div className="landing-page-tech-logos">
        <img className="landing-page-tech-logo-img" src={tech1} alt="" />
        <img className="landing-page-tech-logo-img" src={tech2} alt="" />
        <img className="landing-page-tech-logo-img" src={tech3} alt="" />
        <img className="landing-page-tech-logo-img" src={tech4} alt="" />
        <img className="landing-page-tech-logo-img" src={tech5} alt="" />
      </div>
      <div className="landing-page-aboutus">
        <div className="landing-page-aboutus-text1">About Us</div>
        <div className="landing-page-aboutus-text2">
        Countopia is a Finance solutions powered by <br/>
        artificial intelligence  propel your business <br/> 
        forward and position you for <br/>
        success.
        </div>
        <div className="landing-page-aboutus-text3">Benefits</div>
        <div className="landing-page-aboutus-text4">
        Join Countopia to support you and <br/>
        your business with professionals <br/>
        and fellow industry leaders.
        </div>
      </div>
        
      <div className="landing-page-features-section">
        <div className="landing-page-features-section-title">Features</div>
        <div className="landing-page-features-section-cards">
          <Card
            img={card}
            title={"Analytics"}
            text={
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled"
            }
          />
          <Card
            img={card2}
            title={"Financial journal"}
            text={
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled"
            }
          />
          <Card
            img={card3}
            title={"Intelligent assistance"}
            text={
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled"
            }
          />
        </div>
        <div className="landing-page-features-section-title">Contact Us</div>
      </div>
    </>
  );
}
