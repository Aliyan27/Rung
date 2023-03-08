import React, { useState, useEffect } from "react";
import { getToken } from "firebase/messaging";
import { messaging } from "./Firebase";
import "@firebase/messaging";

import AllRoutes from "./Allroutes";
import { Apiname } from "./Constant/Apiname";
import { decode as base64_decode } from "base-64";
import { fetchApiPost } from "./Utils/FetchApi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TagManager from "react-gtm-module";

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [checkMsisdn, setCheckMsisdn] = useState(false);

  useEffect(() => {
    requestPremission();
    tokenGenerate();
    checkUser();
    const tagManagerArgs = {
      gtmId: "GTM-5LRQ89V",
    };
    TagManager.initialize(tagManagerArgs);
  }, []);

  const requestPremission = async () => {
    try {
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        //generate fcm token
        const token = await getToken(messaging, {
          vapidKey:
            "BPN6ImjwBM_ZUK8v_qB3pQ4R3jNMUz8pR6fgV68hbfSbjMnLQySbpddxgfhXD50ZRMzoooGD2x0IVpOTcMzqLKE",
        });
      } else if (permission === "denied") {
        console.log("you denied permission");
      }
    } catch (error) {
      console.log("notification request denied");
    }
  };

  const tokenGenerate = async () => {
    try {
      let data: any = {
        username: process.env.REACT_APP_UserName,
        password: process.env.REACT_APP_Password,
      };
      const result = await fetchApiPost(null, Apiname.authenticateWeb, data);
      if (result.token) {
        setToken(result.token);
      }
    } catch (error) {}
  };

  const checkUser = () => {
    try {
      if (localStorage.getItem("msisdn") === null) {
        let url = window.location.href;
        if (
          window.location.pathname === "/home" &&
          url.includes("?") &&
          url.includes("ndsism=")
        ) {
          const _url = new URL(url);
          const searchParams = new URLSearchParams(_url.search);
          let msisdn: any = searchParams.get("ndsism");
          msisdn = base64_decode(msisdn);
          localStorage.setItem("msisdn", msisdn);
        }
      }
      setCheckMsisdn(true);
    } catch (error) {
      console.log("Error :: ", error);
      setCheckMsisdn(true);
    }
  };

  return (
    <div className="App">{checkMsisdn && <AllRoutes token={token} />}</div>
  );
}

export default App;
