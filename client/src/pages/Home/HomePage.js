import React from "react";
import "./HomePage.css";
import image from "../../assets/homepageimage.jpg"; // Ensure the path is correct

function HomePage() {
  return (
    <div className="main-page">
      <h1 className="main-page-title">We're Getting Married!</h1>
      <div className="main-page-info">
        <div className="text-content">
          <h1>Our Story</h1>
          <p>
            We met at the Calgary Stampede, connected over country music, and enjoyed the vibrant atmosphere together. Two years later, I proposed to
            Nicole during the Stampede fireworks, and she joyfully said "Yes." Our lives have been filled with excitement and love since that magical
            night. We're thrilled to share our special day with you.
          </p>
        </div>
        <div className="image-container">
          <img src={image} alt="couple" className="image" style={{ width: "500px", height: "auto" }} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
