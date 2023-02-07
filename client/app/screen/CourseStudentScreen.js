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

const CourseStudentScreen = () => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const dispatch = useDispatch();
  const { courseId } = useParams();
  const course = useSelector(selectCourses);

    //Eventhandlers
    const handleShow = () => setShow(true);
    const handleShowEdit = () => setShowEdit(true);

  useEffect(() => {
    dispatch(fetchCourseStudents(courseId));
  }, [dispatch]);

  return (
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
  );
};

export default CourseStudentScreen;
