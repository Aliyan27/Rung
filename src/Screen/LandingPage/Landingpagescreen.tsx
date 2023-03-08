import React, { useState, useEffect } from "react";
import Landingpage from "./LandingPage";
import { Apiname } from "../../Constant/Apiname";
import { useNavigate } from "react-router-dom";
import { fetchApiGet, fetchApiPost } from "../../Utils/FetchApi";
import tagManagerEvents from "../../Utils/GoogleTagManager";

interface props {
  token: string | null;
}
interface getflowapi {
  status: number;
  result: {
    fastFlow: boolean;

    isSpecialFlow: boolean;

    milliseconds: number;

    msisdn: string;

    otp: string;

    signIn: boolean;
  };

  data: {
    value: string;
    otp: string;
    time: number;
    utm: string;
    result: boolean;
    fastFlow: boolean;
    isSpecialFlow: boolean;
  };
}
interface Status {
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

function Landingpagescreen({ token }: props) {
  const [value, setValue] = useState<string>("");
  const [status, setStatus] = useState<Status>({
    loading: false,
    error: false,
    errorMessage: "",
  });
  const [getflowdata, setGetflowdate] = useState<getflowapi>();
  const [utm, setUtm] = useState<string | null>("");

  useEffect(() => {
    if (window.location.protocol === "https:") {
      let url = window.location.href;
      url = url.replace("https", "http");
      window.location.replace(url);
    }
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const utmurl = searchParams.get("utm_source");
    setUtm(utmurl);
  }, []);

  useEffect(() => {
    if (token !== null) {
      getFlow();
    }
  }, [token]);
  const navigate = useNavigate();

  const getFlow = async () => {
    try {
      const endPoint = `${Apiname.getflow}?utm_source=${utm}`;
      const response = await fetchApiGet(token, endPoint);
      setGetflowdate(response);
      if (response.status === 0) {
        if (
          response.result.msisdn !== null &&
          response.result.isSpecialFlow === false
        ) {
          tagManagerEvents("He_User", utm);
          setValue(response.result.msisdn);
        } else if (
          response.result.msisdn !== null &&
          response.result.isSpecialFlow === true &&
          response.result.otp !== null
        ) {
          const data = {
            value: response.result.msisdn,
            specialFlow: response.result.isSpecialFlow,
            fastFlow: response.result.fastFlow,
            otp: response.result.otp,
            time: response.result.milliseconds,
            utm: utm,
          };
          setValue(response.result.msisdn);
          navigate("/pin", { state: data });
        } else {
          console.log("connect to wifi");
          tagManagerEvents("Wifi_User", utm);
        }
      }
    } catch (error) {}
  };

  const userInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (!newValue || (newValue.length <= 10 && newValue.match(/^3\d{0,9}$/))) {
      tagManagerEvents("Msisdn_Enter", utm);
      setValue(event.target.value);
    }
  };
  const handleSubmit = () => {
    if (value.length === 10) {
      tagManagerEvents("Get_Otp_Button_Click", utm);
      checkOperator();
    } else {
      setStatus((prevStatus) => ({
        ...prevStatus,
        errorMessage: "Please enter 10 digit mobile number",
      }));
    }
  };

  const checkOperator = async () => {
    try {
      setStatus((prevStatus) => ({ ...prevStatus, loading: true }));
      const number = Apiname.checkoperator + value;
      const result = await fetchApiGet(token, number);
      if (result.status === 0) {
        let _network = result.network.toLowerCase();
        if (_network === "others" || _network === "other") {
          setStatus((prevStatus) => ({
            ...prevStatus,
            loading: false,
            error: true,
            errorMessage:
              "Service is only available for Jazz customers, kindly enter a working Jazz number ",
          }));
        } else {
          sendOtp();
          setStatus((prevStatus) => ({ ...prevStatus, error: false }));
        }
      } else {
        sendOtp();
        setStatus((prevStatus) => ({ ...prevStatus, error: false }));
      }
    } catch (error) {
      sendOtp();
      setStatus((prevStatus) => ({ ...prevStatus, error: false }));
    }
  };

  const sendOtp = async () => {
    try {
      const data = {
        msisdn: value,
      };
      const result = await fetchApiPost(token, Apiname.sendotp, data);
      if (result.status === 0 && result.result.toLowerCase() === "success") {
        const data = {
          value: value,
          otp: getflowdata?.result.otp,
          time: getflowdata?.result.milliseconds,
          result: result.exists,
          isSpecialFlow: getflowdata?.result.isSpecialFlow,
          fastFlow: getflowdata?.result.fastFlow,
          utm: utm,
        };
        setStatus((prevStatus) => ({ ...prevStatus, loading: false }));
        navigate("/pin", {
          state: data,
        });
      } else {
        setStatus((prevStatus) => ({
          ...prevStatus,
          loading: false,
          errorMessage: "Unable to send OTP, Please try again",
        }));
      }
    } catch (error) {
      setStatus((prevStatus) => ({
        ...prevStatus,
        loading: false,
        errorMessage: "Unable to send OTP, Please try again",
      }));
    }
  };

  return (
    <>
      <Landingpage
        value={value}
        handleSubmit={handleSubmit}
        userInput={userInput}
        status={status}
      />
    </>
  );
}

export default Landingpagescreen;
