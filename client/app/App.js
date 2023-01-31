import React from "react";
import { SamplePieChart } from "./screen/TestChart";

// Router
import { Routes, Route } from "react-router-dom";
import CourseReportScreen from "./componenets/CourseReport";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<h1>Intellego Home</h1>} />
        <Route path='/test' element={<SamplePieChart />} />
        <Route path='/report/courses/:courseId' element={<CourseReportScreen />} />
      </Routes>
    </div>
  );
}
