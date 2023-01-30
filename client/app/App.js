import React from "react";
import { SamplePieChart } from "./screen/TestChart";

// Router
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<h1>That's start our Capstone project!</h1>} />
        <Route path='/test' element={<SamplePieChart />} />
      </Routes>
    </div>
  );
}
