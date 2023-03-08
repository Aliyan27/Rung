import React, { useRef, useState, useEffect, Component } from "react";
import tagManagerEvents from "../../Utils/GoogleTagManager";
import Slider from "react-slick";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import user from "../../assets/user.webp";
import logo from "../../assets/rung-logo.webp";
import profile from "../../assets/img-1.webp";
import search from "../../assets/search-outline.webp";
import vector from "../../assets/Vector.webp";
import follow from "../../assets/Mask group.webp";
import home from "../../assets/Home.webp";
import icone from "../../assets/icone.webp";
import layer from "../../assets/Layer 2.webp";
import shoot from "../../assets/Shoot.webp";
import vector2 from "../../assets/Vector2.webp";
import Popup from "../../components/common/Popup";
import { Apiname } from "../../Constant/Apiname";
import videodata from "../../Constant/videodata.json";
import "../../Stylesheet/Mainpage.css";
import { useNavigate } from "react-router-dom";
import { fetchApiGet } from "../../Utils/FetchApi";

interface prop {
  token: string | null;
}

const Mainpage = (prop: prop) => {
  const [isPopupShown, setIsPopupShown] = useState<boolean>(false);
  const [utm, setUtm] = useState<string | null>("");
  const [showpopup, setShowpopup] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [accoutndata, setAccountdata] = useState<any>();
  const navigate = useNavigate();
  let msisdn = localStorage.getItem("msisdn");

  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const utmurl = searchParams.get("utm_source");
    setUtm(utmurl);
  }, []);

  useEffect(() => {
    if (msisdn === null) {
      navigate("/landing");
    } else {
      if (prop.token !== null) {
        suggestaccount();
        tagManagerEvents("Landing_On_Home", utm);
      }
    }
  }, [prop.token]);

  const handleBeforeChange = (oldIndex: number, newIndex: number) => {
    setCurrentSlide(newIndex);
  };

  const handleAfterChange = (currentIndex: number) => {
    setCurrentSlide(currentIndex);
  };

  const settings = {
    vertical: true,
    verticalSwiping: true,

    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
  };

  const handleShowPopup = () => {
    setMute(true);
    setShowpopup(true);
    setIsPopupShown(true);
    const myDiv = document.getElementById("Container");
    document.body.classList.add("no-scroll");
    if (myDiv) {
      myDiv.classList.add("blur");
    }
  };

  const handleHidePopup = () => {
    setMute(false);
    setIsPopupShown(false);
    setShowpopup(false);
    document.body.classList.remove("no-scroll");
    const myDiv = document.getElementById("Container");
    if (myDiv) {
      myDiv.classList.remove("blur");
    }
  };

  const suggestaccount = async () => {
    const response = await fetchApiGet(prop.token, Apiname.suggested);
    setAccountdata(response.result);
    console.log(response.result);
  };

  const handleLike = () => {
    tagManagerEvents("Like_Button", utm);
  };
  const handleShare = () => {
    tagManagerEvents("Share", utm);
  };
  const handleUserProfile = () => {
    tagManagerEvents("User_Profile", utm);
  };
  const following = () => {
    tagManagerEvents("Following", utm);
  };

  return (
    <>
      <header>
        <div className="Container">
          <div className="logo" onClick={handleShowPopup}>
            <img src={logo} alt="missing" />
          </div>
          <div className="searchbar">
            <input type="text" placeholder="Search accounts & videos" />
            <img src={search} alt="missing" />
          </div>
          <div className="profile-img" onClick={handleShowPopup}>
            <img src={profile} alt="missing" />
          </div>
        </div>
      </header>
      <div className="main-section">
        {showpopup ? <Popup handleHidePopup={handleHidePopup} /> : ""}

        <div className="Container" id="Container">
          <div className="sidenavbar">
            <div className="navbar margin-bottom" onClick={handleShowPopup}>
              <nav>
                <ul>
                  <li>
                    <img src={vector} alt="missing" />
                    <span className="for-you"> For You</span>
                  </li>
                  <li>
                    <img src={follow} alt="missing" /> Following
                  </li>
                </ul>
              </nav>
            </div>

            <div
              className="suggested-account margin-bottom"
              onClick={handleShowPopup}
            >
              <h2>Suggested Account</h2>
              {accoutndata?.map((account: any, index: number) => (
                <div className="profile" key={index}>
                  <div className="profile-img">
                    {account.picture ? (
                      <img src={account.picture} alt="missing" />
                    ) : (
                      <img src={user} alt="missing" />
                    )}
                  </div>
                  <div className="username">
                    <p>{account.nick}</p>
                    <span onClick={handleUserProfile}>{account.name}</span>
                  </div>
                </div>
              ))}
              <span className="seeall">See All</span>
            </div>
            <div
              className="following-account margin-buttom"
              onClick={handleShowPopup}
            >
              <h2>Following accounts</h2>
              <div className="profile">
                <div className="profile-img">
                  <img src={profile} alt="missing" />
                </div>
                <div className="username">
                  <p>sidmr.rapper4</p>
                  <span>Sid Mr.Rapper</span>
                </div>
              </div>
              <div className="profile">
                <div className="profile-img">
                  <img src={profile} alt="missing" />
                </div>
                <div className="username">
                  <p>sidmr.rapper4</p>
                  <span>Sid Mr.Rapper</span>
                </div>
              </div>
              <span className="seeall">See All</span>
            </div>
          </div>
          <div className="videosection">
            <Slider {...settings} ref={sliderRef}>
              {videodata?.map((video: any, index: number) => (
                <div className="feed" id={video.id}>
                  <div className="profile-top" onClick={handleShowPopup}>
                    <div className="profile">
                      <div className="profile-img">
                        {video.creator.picture ? (
                          <img src={video.creator.picture} alt="missing" />
                        ) : (
                          <img src={user} alt="missing" />
                        )}
                      </div>
                      <div className="username-feed">
                        <p>{video.creator.nickname}</p>
                        <span>{video.creator.username}</span>
                      </div>
                    </div>
                    <span className="btn" onClick={following}>
                      Follow
                    </span>
                  </div>
                  <div className="video" id={video.id}>
                    {index === currentSlide && (
                      <video
                        src={video.url}
                        muted={mute}
                        autoPlay
                        loop={true}
                        playsInline={true}
                        onClick={handleShowPopup}
                      />
                    )}

                    <div className="side-icone" onClick={handleShowPopup}>
                      <ul>
                        <li>
                          <div className="profile-img ">
                            <img src={video.creator.picture} alt="" />
                          </div>
                        </li>
                        <li onClick={handleLike}>
                          <FaRegHeart />
                        </li>
                        <li>
                          {" "}
                          <AiOutlineMessage />
                        </li>
                        <li onClick={handleShare}>
                          <FiSend />
                        </li>
                      </ul>
                    </div>
                    <div className="video-detail">
                      <p>{video.creator.username}</p>
                      <p>{video.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          <div className="videonavbar" onClick={handleShowPopup}>
            <nav>
              <ul>
                <li>
                  <img src={home} alt="missing" />
                </li>
                <li>
                  <img src={layer} alt="missing" />
                </li>
                <li>
                  <img src={shoot} alt="missing" />
                </li>
                <li>
                  <img src={vector2} alt="missing" />
                </li>
                <li>
                  <img src={icone} alt="missing" />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mainpage;
