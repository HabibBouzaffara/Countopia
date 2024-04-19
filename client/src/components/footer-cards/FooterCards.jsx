import React from "react";
import "./FooterCards.css";
export default function FooterCards({ title, links }) {
  return (
    <>
      <div className="landing-page-footer-card-container">
        <div className="landing-page-footer-title">{title}</div>
        {links.map((link, i) => {
          // console.log(link);
          return (
            <div className="landing-page-footer-link" key={i}>
              {link}
            </div>
          );
        })}
      </div>
    </>
  );
}
