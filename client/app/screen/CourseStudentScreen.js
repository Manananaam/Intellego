import React, { useEffect, useState } from "react";

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
import { Button, Dropdown } from "react-bootstrap";
import { Dropbox } from "react-bootstrap-icons";

const CourseStudentScreen = () => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState("");

  const dispatch = useDispatch();
  const { courseId } = useParams();
  const course = useSelector(selectCourses);

  //Eventhandlers
  const handleShow = () => setShow(true);
  const handleShowEdit = (selection) => {
    setShowEdit(true);
    setCurrentStudentId(selection.target.id);
  };

  useEffect(() => {
    dispatch(fetchCourseStudents(courseId));
  }, [showEdit, show]);

  return (
    <>
      <h1>Students in {course.name}</h1>
      <Table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {course.students && course.students.length
            ? course.students.map((student) => {
                const studentId = student.id;
                return (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic"></Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            href={`/report/students?courseId=${courseId}&studentId=${studentId}`}
                          >
                            View Report
                          </Dropdown.Item>
                          <Dropdown.Item
                            id={studentId}
                            onClick={handleShowEdit}
                          >
                            Edit/Remove Student
                          </Dropdown.Item>
                        </Dropdown.Menu>
                        <StudentEdit
                          showEdit={showEdit}
                          setShowEdit={setShowEdit}
                          id={currentStudentId}
                        ></StudentEdit>
                      </Dropdown>
                    </td>
                    <td></td>
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
