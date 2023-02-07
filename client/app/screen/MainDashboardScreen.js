//react
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//screens
import Sidebar from "../components/Sidebar";
import CousreScreen from "./CourseScreen";
import CourseStudentScreen from "./CourseStudentScreen";
import CourseAssessmentsScreen from "./CourseAssessmentsScreen";
import StudentReportScreen from "./StudentReportScreen";
import AssessmentsScreen from "./AssessmentsScreen";
import EditAssessmentScreen from "./EditAssessmentScreen";
import CreateAssessmentScreen from "./CreateAssessmentScreen";
import AssessmentReportScreen from "./AssessmentReportScreen";
import CourseReportScreen from "./CourseReportScreen";
import StudentViewScreen from "./StudentViewScreen";

const MainDashboardScreen = () => {
  return (
    <Container>
      <Row>
        <Col xs={3} md={4} id="sidebar-wrapper">
          <Sidebar />
        </Col>
        <Col xs={9} md={8} id="page-content-wrapper">
          <h1>Intellego</h1>
          <Routes>
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
              <Route
                path="/assessments/:assessmentId"
                element={<EditAssessmentScreen />}
              />
            </Route>
            <Route path="/report/students" element={<StudentReportScreen />} />
            <Route
              path="/report/assessments"
              element={<AssessmentReportScreen />}
            />

            <Route path="/report/courses/" element={<CourseReportScreen />} />
            <Route
              path="/student/courses/:courseId/assessments/:assessmentId"
              element={<StudentViewScreen />}
            />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default MainDashboardScreen;
