import React, { useEffect } from "react";

//Bootstrap imports
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//React related imports
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  fetchCourseStudents,
  selectCourses,
} from "../store/slices/courseSlices";

const CourseStudentScreen = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const course = useSelector(selectCourses);

  useEffect(() => {
    dispatch(fetchCourseStudents(courseId));
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <Col xs={3} id="sidebar-wrapper">
          <Sidebar />
        </Col>
        <Col xs={9} id="page-content-wrapper">
          <h1>Students in {course.name}</h1>
          <Table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Report</th>
              </tr>
            </thead>
            <tbody>
              {course.students && course.students.length
                ? course.students.map((student) => {
                    return (
                      <tr key={student.id} href="">
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.id}</td>
                        <td>
                          <Link
                            to={`/report/students?courseId=${courseId}&studentId=${student.id}`}
                          >
                            View report
                          </Link>
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

export default CourseStudentScreen;
