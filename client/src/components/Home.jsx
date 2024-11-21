import React from "react";
import "../styles/HomePage.css";


const HomePage = () => {
  return (
    <div className="homepage">
      

      <section className="hero">
        <div className="hero-text">
          <h2>Your Official Place for 3D Printing</h2>
          <a href="/project" className="view-project">
            View Project →
          </a>
        </div>
        <div className="hero-image">
          <img
            src="https://via.placeholder.com/600x400" // Replace with your image URL
            alt="Hero"
          />
        </div>
      </section>

      <section className="recommended">
        <h2>Recommended</h2>
        <div className="recommended-images">
          <img src="https://via.placeholder.com/150" alt="1" />
          <img src="https://via.placeholder.com/150" alt="2" />
          <img src="https://via.placeholder.com/150" alt="3" />
          <img src="https://via.placeholder.com/150" alt="4" />
          <img src="https://via.placeholder.com/150" alt="5" />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
