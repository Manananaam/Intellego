import React from "react";
import { SamplePieChart } from "./screen/TestChart";
import HomeScreen from "./screen/HomeScreen";
import LogInScreen from "./screen/LogInScreen";
import SignUpScreen from "./screen/SignUpScreen";

// Router
import { Routes, Route } from "react-router-dom";

// Screen
import StudentReportScreen from "./screen/StudentReportScreen";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/test" element={<SamplePieChart />} />
        <Route path="/login" element={<LogInScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/report/students" element={<StudentReportScreen />} />
      </Routes>
    </div>
  );
}
