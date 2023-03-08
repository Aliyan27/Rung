import React from "react";
import "../../Stylesheet/popup.css";
import img from "../../assets/full-experience 1.webp";
import playstore from "../../assets/playstore.webp";
import crosssign from "../../assets/Ellipse 601.png";
import tagManagerEvents from "../../Utils/GoogleTagManager";

interface prop {
  handleHidePopup: any;
}

function Popup({ handleHidePopup }: prop) {
  const utm = null;
  const Download = () => {
    tagManagerEvents("Download_Button_Click", utm);
  };
  return (
    <>
      <div className="popup">
        <div className="Container">
          <div className="crosssign" onClick={handleHidePopup}>
            <img src={crosssign} alt="missing" />
          </div>
          <div className="popup-img">
            <img src={img} alt="missing" />
          </div>
          <div className="popup-detail">
            <h2>To Get Full Experience</h2>
            <p>Download The App From PLaystore</p>
            <div className="playstoreimg">
              <img src={playstore} alt="missing" />
            </div>
            <span className="btn" onClick={Download}>
              <a href="https://play.google.com/store/apps/details?id=com.jazz.rung">
                Download Now
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Popup;
