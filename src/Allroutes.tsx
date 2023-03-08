import React, { lazy } from "react";
import Landingpagescreen from "./Screen/LandingPage/Landingpagescreen";
import { Routes, Route, Navigate } from "react-router-dom";

const Otpscreen = lazy(() => import("./Screen/OtpScreen/Otpscreen"));
const Mainpage = lazy(() => import("./Screen/Mainpage/Mainpage"));

interface props {
  token: string | null;
}

const AllRoutes = ({ token }: props) => {
  return (
    <>
      <Routes>
        {localStorage.getItem("msisdn") ? (
          <Route path="/landing" element={<Navigate replace to={"/home"} />} />
        ) : (
          <Route
            path="/landing"
            element={<Landingpagescreen token={token} />}
          />
        )}
        <Route path="/phone" element={<Landingpagescreen token={token} />} />
        <Route path="/pin" element={<Otpscreen token={token} />} />
        <Route path="/home" element={<Mainpage token={token} />} />
        <Route path="*" element={<Navigate replace to={"/home"} />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
