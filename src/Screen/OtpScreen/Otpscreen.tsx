import React, { useState, useEffect } from "react";
import Otppage from "./Otppage";
import { useLocation } from "react-router-dom";
import { Apiname } from "../../Constant/Apiname";
import { useNavigate } from "react-router-dom";
import { encode as base64_encode } from "base-64";
import { fetchApiPost } from "../../Utils/FetchApi";
import tagManagerEvents from "../../Utils/GoogleTagManager";

interface props {
  token: string | null;
}

const Otpscreen = ({ token }: props) => {
  const [otp, setOtp] = useState<{
    one: string;
    two: string;
    three: string;
    four: string;
  }>({
    one: "",
    two: "",
    three: "",
    four: "",
  });
  const [inputs, setInputs] = useState<React.RefObject<HTMLInputElement>[]>([
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
  ]);
  const [error, setError] = useState<boolean>(false);
  const [errormessage, setErrormessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  const checkopiname = otp.one + otp.two + otp.three + otp.four;

  useEffect(() => {
    if (state.value === null) {
      navigate("/landing");
    } else {
      specialFlow();
    }
  }, [checkopiname]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValue = e.target.value;
    if (!isNaN(newValue as any) && newValue !== " ") {
      tagManagerEvents("Otp_Enter", state.utm);
      setOtp({
        ...otp,
        [e.target.name]: newValue,
      });
      if (e.target.value.length === 1) {
        const nextInput = inputs[index + 1];
        if (nextInput?.current) {
          nextInput.current.focus();
        }
      }
    }
  };

  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (e.keyCode === 8) {
      const target = e.target as HTMLInputElement;
      if (target.value.length === 0 && index !== 0) {
        (inputs[index - 1].current as HTMLInputElement).focus();
        setError(false);
        setLoading(false);
      }
    }
  };

  const Otpsubmit = () => {
    setLoading(true);
    tagManagerEvents("Subscribe_Button_Click", state.utm);
    if (state.result === true) {
      verifyOtp();
    } else {
      subscribeotp(Apiname.subscribe);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      const data = {
        msisdn: state.value,
        otp: otp.one + otp.two + otp.three + otp.four,
      };
      const response = await fetchApiPost(token, Apiname.verifyOTP, data);
      if (response.status === 0) {
        let url = window.location.origin;
        let encodedMsisdn = base64_encode(state.value);
        url = `${url}/home?ndsism=${encodedMsisdn}`;
        if (url.includes("http:")) {
          url = url.replace("http", "https");
        }
        window.location.replace(url);
      } else {
        setError(true);
        setErrormessage("Please enter valid OTP");
        setLoading(false);
      }
    } catch (error) {
      setError(true);
      setErrormessage("Something went wrong, please try again");
      setLoading(false);
    }
  };

  const subscribeotp = async (name: string) => {
    try {
      const data = {
        msisdn: state.value,
        nick: "Hamza Khan G",
        otp: otp.one + otp.two + otp.three + otp.four,
      };
      const response = await fetchApiPost(token, name, data);
      if (response.result.toLowerCase() === "success") {
        let url = window.location.origin;
        let encodedMsisdn = base64_encode(state.value);
        url = `${url}/home?ndsism=${encodedMsisdn}`;
        if (url.includes("http:")) {
          url = url.replace("http", "https");
        }
        window.location.replace(url);
      } else {
        setError(true);
        setErrormessage("Please enter valid OTP");
      }
    } catch (error) {
      setError(true);
      setErrormessage("Something went wrong, please try again.");
    }
  };

  const Resend = async () => {
    try {
      setOtp({
        one: "",
        two: "",
        three: "",
        four: "",
      });
      setError(false);
      const data = {
        msisdn: state.value,
      };
      setLoading(false);
      const result = await fetchApiPost(token, Apiname.sendotp, data);
      if (result.status !== 0) {
        setError(true);
        setErrormessage("Something went wrong, please try again");
      }
    } catch (error) {
      setError(true);
      setErrormessage("Something went wrong, please try again");
    }
  };

  const specialFlow = () => {
    if (state.specialFlow === true) {
      if (state.otp !== "") {
        setOtp({
          one: state.otp[0],
          two: state.otp[1],
          three: state.otp[2],
          four: state.otp[3],
        });

        if (state.time && state.time >= 0) {
          setTimeout(
            () =>
              subscribeotp(
                state.specialFlow && state.fastFlow
                  ? Apiname.ffsubscribe
                  : Apiname.subscribe
              ),
            state.time
          );
        }
      }
    }
  };

  return (
    <>
      <Otppage
        otp={otp}
        inputs={inputs}
        handleChange={handleChange}
        handleBackspace={handleBackspace}
        Otpsubmit={Otpsubmit}
        error={error}
        errormessage={errormessage}
        Resend={Resend}
        loading={loading}
      />
    </>
  );
};

export default Otpscreen;
