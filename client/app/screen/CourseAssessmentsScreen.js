//react related imports
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  fetchCourseAssessments,
  selectCourses,
} from "../store/slices/courseSlices";
//Bootstrap imports
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "../components/Sidebar";

//CourseAssessmentsScreen Render
const CourseAssessmentsScreen = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const course = useSelector(selectCourses);

  useEffect(() => {
    dispatch(fetchCourseAssessments(courseId));
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <Col xs={3} id='sidebar-wrapper'>
          <Sidebar />
        </Col>
        <Col xs={9} id='page-content-wrapper'>
          <h1>Assessments in {course.name}</h1>
          <Table>
            <thead>
              <tr>
                <th>Assessment ID</th>
                <th>Title</th>
                <th>Report</th>
              </tr>
            </thead>
            <tbody>
              {course.assessments && course.assessments.length
                ? course.assessments.map((assessment) => {
                    return (
                      <tr key={assessment.id}>
                        <td>{assessment.id}</td>
                        <td>{assessment.title}</td>
                        <td>
                          <Link to={"//Query URL"}>View report</Link>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseAssessmentsScreen;
