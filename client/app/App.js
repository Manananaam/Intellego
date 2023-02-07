//react & redux
import React from "react";
// Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Screen
import MainDashboardScreen from "./screen/MainDashboardScreen";
import HomeScreen from "./screen/HomeScreen";
import LogInScreen from "./screen/LogInScreen";
import SignUpScreen from "./screen/SignUpScreen";

import { useSelector } from "react-redux";
import { selectAuthState } from "./store/slices/authSlice";

export default function App() {
  const { user } = useSelector(selectAuthState);

  return (
    <>
      {user ? (
        <>
          <Routes>
            <Route path="*" element={<MainDashboardScreen />} />
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LogInScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
          </Routes>
        </>
      )}
    </>
  );
}
