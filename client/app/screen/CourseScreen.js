//React related imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCourses,
  fetchAllCourses,
  isActiveCourse,
} from "../store/slices/courseSlices";
import CourseCreate from "../components/CourseCreate";
import CourseEdit from "../components/CourseEdit";
import { useNavigate, Link } from "react-router-dom";

//Bootstrap imports
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import "../components/style/Sidebar.css";

//CourseScreen
const CourseScreen = () => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [id, setId] = useState(null);

  //Redux
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const navigate = useNavigate();

  //Eventhandlers
  const handleShow = () => setShow(true);

  //Hooks
  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [showEdit, show, isActive]);

  //render
  return (
    <>
      <h1>Courses </h1>
      <Button variant="primary" onClick={handleShow}>
        Create Course +
      </Button>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses && courses.length
            ? courses.map((course) => {
                const courseId = course.id;
                const handleShowEdit = () => {
                  setId(course.id);
                  setShowEdit(true);
                };
                return (
                  <tr key={course.id}>
                    <td>{course.name}</td>
                    <td>{course.subject}</td>
                    <td>{course.gradeLevel}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic"></Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            as={Link}
                            to={`/courses/${course.id}/students`}
                          >
                            Students
                          </Dropdown.Item>
                          <Dropdown.Item
                            as={Link}
                            to={`/courses/${course.id}/assessments`}
                          >
                            Assessments
                          </Dropdown.Item>{" "}
                          <Dropdown.Item
                            as={Link}
                            to={`/report/course?courseId=${courseId}`}
                          >
                            Report
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item onClick={handleShowEdit}>
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              setIsActive(false);
                              dispatch(isActiveCourse({ courseId, isActive }));
                              navigate(0);
                            }}
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
      <CourseEdit showEdit={showEdit} setShowEdit={setShowEdit} id={id} />
      <CourseCreate show={show} setShow={setShow} />
    </>
  );
};
export default CourseScreen;
