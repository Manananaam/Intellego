import React from "react";
import { SamplePieChart } from "./screen/TestChart";
import HomeScreen from "./screen/HomeScreen";
import LogInScreen from "./screen/LogInScreen";
import SignUpScreen from "./screen/SignUpScreen";
import AssessmentsScreen from "./screen/AssessmentsScreen";
import EditAssessmentScreen from "./screen/EditAssessmentScreen";
import CreateAssessmentScreen from "./screen/CreateAssessmentScreen";

// Router
import { Routes, Route } from "react-router-dom";
import CousreScreen from "./screen/CourseScreen";
import CourseStudentScreen from "./screen/CourseStudentScreen";
import CourseAssessmentsScreen from "./screen/CourseAssessmentsScreen";

// Screen
import StudentReportScreen from "./screen/StudentReportScreen";
import MainDashboardScreen from "./screen/MainDashboardScreen";
import AssessmentReportScreen from "./screen/AssessmentReportScreen";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeScreen />} />

        <Route path="/test" element={<SamplePieChart />} />
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
        <Route path="/login" element={<LogInScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/assessments" element={<AssessmentsScreen />} />
        <Route
          path="/assessments/create"
          element={<CreateAssessmentScreen />}
        ></Route>
        <Route
          path="/assessments/:assessmentId"
          element={<EditAssessmentScreen />}
        />

        <Route path="/report/students" element={<StudentReportScreen />} />
        <Route path="/report/assessments" element={<AssessmentReportScreen />} />
      </Routes>
    </div>
  );
}
