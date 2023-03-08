import React from "react";
import logo from "../../assets/video-logo.webp";
import img from "../../assets/woman.webp";
import "../../Stylesheet/Banner.css";

const Banner = () => {
  return (
    <div className="Banner">
      <div className="img">
        <div className="logo">
          <img src={logo} alt="missing" />
        </div>
        <img src={img} alt="missing" />
      </div>
    </div>
  );
};
export default Banner;
