import React from "react";
import { SamplePieChart } from "./screen/TestChart";

// Router
import { Routes, Route } from "react-router-dom";

// Screen
import StudentReportScreen from "./screen/StudentReportScreen";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<h1>That's start our Capstone project!</h1>} />
        <Route path="/test" element={<SamplePieChart />} />
        <Route path="/reports/students" element={<StudentReportScreen />} />
      </Routes>
    </div>
  );
}
