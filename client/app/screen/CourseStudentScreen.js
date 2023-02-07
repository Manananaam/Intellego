import React, { useEffect } from "react";

//Bootstrap imports
import Table from "react-bootstrap/Table";

//React related imports
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  fetchCourseStudents,
  selectCourses,
} from "../store/slices/courseSlices";
import { StudentEdit } from "../components/StudentEdit";
import { Button } from "react-bootstrap";

const CourseStudentScreen = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const course = useSelector(selectCourses);

  useEffect(() => {
    dispatch(fetchCourseStudents(courseId));
  }, [dispatch]);

  return (
    <>
          <h1>Students in {course.name}</h1>
          <Table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Report</th>
                <th>Edit Student</th>
              </tr>
            </thead>
            <tbody>
              {course.students && course.students.length
                ? course.students.map((student) => {
                    return (
                      <tr key={student.id} href="">
                        <td>{student.id}</td>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>
                          <Link
                            to={`/report/students?courseId=${courseId}&studentId=${student.id}`}
                          >
                            View report
                          </Link>
                        </td>
                        <td>
                          <Button variant="primary" onClick={StudentEdit}>Edit Student</Button>
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

export default CourseStudentScreen;
