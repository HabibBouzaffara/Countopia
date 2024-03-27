import React from "react";
import "./Card.css"
export default function Card({ img, title, text }) {
  return (
    <div className="landing-page-card">
      <div className="landing-page-card-img-container">
        <img className="landing-page-card-img" src={img} alt="" />
      </div>
      <div className="landing-page-card-text">
        <div className="card-title">{title} </div>
        <div className="card-text">{text} </div>
      </div>
    </div>
  );
}
