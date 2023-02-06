//react related imports
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  fetchCourseAssesments,
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
    dispatch(fetchCourseAssesments(courseId));
  }, [dispatch]);

  return (
    <>
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
    </>
  );
};

export default CourseAssessmentsScreen;
