import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <div className="hero-body">
      <div className="hero-card">
      <div className="title">
        <h2>Welcome to SPLASHERZ</h2>
      </div>
      <div className="paragraph">
        <p>
          Explore the seamless integration of technology and service excellence
          with our innovative solutions. From personalized appointments to
          efficient inventory management, we are committed to delivering
          exceptional customer experiences. Join us in redefining automotive
          service standards with precision and care.
        </p>
      </div>
      <div className="explore-btn">
        <button type="submit">Explore more</button>
      </div>
      </div>
     
    </div>
  );
}

export default Hero;
