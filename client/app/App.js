import React from "react";
import { SamplePieChart } from "./screen/TestChart";
import HomeScreen from "./screen/HomeScreen";
import LogInScreen from "./screen/LogInScreen";
import SignUpScreen from "./screen/SignUpScreen";
import AssessmentsScreen from "./screen/AssessmentsScreen";
import EditAssessmentScreen from "./screen/EditAssessmentScreen";
import StudentViewScreen from "./screen/StudentViewScreen";

// Router
import { Routes, Route } from "react-router-dom";
import CousreScreen from "./screen/CousreScreen";
import CourseStudentScreen from "./screen/CourseStudentScreen";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/courses" element={<CousreScreen />} />
        <Route
          path="/courses/:courseId/students"
          element={<CourseStudentScreen />}
        />
        <Route path="/login" element={<LogInScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/assessments" element={<AssessmentsScreen />} />
        <Route
          path="/assessments/:assessmentId"
          element={<EditAssessmentScreen />}
        />
        <Route
          path="/student/assessment/:assessmentId"
          element={<StudentViewScreen />}
        />
      </Routes>
    </div>
  );
}
