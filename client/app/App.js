import React from "react";

// Router
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<h1>That's start our Capstone project!</h1>} />
      </Routes>
    </div>
  );
}
