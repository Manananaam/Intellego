import React from "react";
import { SamplePieChart } from "./screen/TestChart";
import HomeScreen from "./screen/HomeScreen";
import LogInScreen from "./screen/LogInScreen";
import SignUpScreen from "./screen/SignUpScreen";
import AssessmentsScreen from "./screen/AssessmentsScreen";
import EditAssessmentScreen from "./screen/EditAssessmentScreen";

// Router
import { Routes, Route } from "react-router-dom";
import CousreScreen from "./screen/CourseScreen";
import CourseStudentScreen from "./screen/CourseStudentScreen";
import CourseAssessmentsScreen from "./screen/CourseAssessmentsScreen";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/courses" element={<CousreScreen />} />
        <Route
          path="/courses/:courseId/students"
          element={<CourseStudentScreen />}
        />{" "}
        <Route
          path="/courses/:courseId/assessments"
          element={<CourseAssessmentsScreen />}
        />
        <Route path="/login" element={<LogInScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/assessments" element={<AssessmentsScreen />} />
        <Route
          path="/assessments/:assessmentId"
          element={<EditAssessmentScreen />}
        />
      </Routes>
    </div>
  );
}
