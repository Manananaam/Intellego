//react & redux
import React from "react";
// Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CousreScreen from "./screen/CourseScreen";
import CourseStudentScreen from "./screen/CourseStudentScreen";
import CourseAssessmentsScreen from "./screen/CourseAssessmentsScreen";
import StudentReportScreen from "./screen/StudentReportScreen";
import MainDashboardScreen from "./screen/MainDashboardScreen";
import HomeScreen from "./screen/HomeScreen";
import LogInScreen from "./screen/LogInScreen";
import SignUpScreen from "./screen/SignUpScreen";
import AssessmentsScreen from "./screen/AssessmentsScreen";
import EditAssessmentScreen from "./screen/EditAssessmentScreen";
import CreateAssessmentScreen from "./screen/CreateAssessmentScreen";
import CourseReportScreen from "./screen/CourseReportScreen";

// Screen

import AssessmentReportScreen from "./screen/AssessmentReportScreen";

export default function App() {
  return (
    <>
      <MainDashboardScreen />

      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LogInScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/dashboard" element={<MainDashboardScreen />} />
        <Route path="/courses" element={<CousreScreen />} />
        <Route
          path="/courses/:courseId/students"
          element={<CourseStudentScreen />}
        />
        <Route
          path="/courses/:courseId/assessments"
          element={<CourseAssessmentsScreen />}
        />

        <Route path="/assessments" element={<AssessmentsScreen />}>
          <Route
            path="/assessments/create"
            element={<CreateAssessmentScreen />}
          ></Route>
          <Route path="/report/courses/" element={<CourseReportScreen />} />
          <Route
            path="/assessments/:assessmentId"
            element={<EditAssessmentScreen />}
          />
        </Route>
        <Route path="/report/students" element={<StudentReportScreen />} />

        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LogInScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route
          path="/report/assessments"
          element={<AssessmentReportScreen />}
        />
      </Routes>
    </>
  );
}
