import React from "react";
import { SamplePieChart } from "./screen/TestChart";
import AssessmentsScreen from "./screen/AssessmentsScreen";

// Router
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<h1>That's start our Capstone project!</h1>} />
        <Route path='/test' element={<SamplePieChart />} />
        <Route path="/assessments" element={<AssessmentsScreen />} />
      </Routes>
    </div>
  );
}
