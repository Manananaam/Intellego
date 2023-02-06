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
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

//Bootstrap imports
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../components/style/Sidebar.css";

//CourseScreen
const CousreScreen = () => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [isActive, setIsActive] = useState(false);

  //Redux
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const navigate = useNavigate();

  //Eventhandlers
  const handleShow = () => setShow(true);
  const handleShowEdit = () => setShowEdit(true);

  //Hooks
  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [showEdit, show, isActive]);

  //render
  return (
    <Container>
      <Row>
        <Col xs={3} id="sidebar-wrapper">
          <Sidebar />
        </Col>
        <Col xs={9} id="page-content-wrapper">
          <h1>Classes</h1>
          <Button variant="primary" onClick={handleShow}>
            Create Class +
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
                                href={`/courses/${course.id}/students`}
                              >
                                Students
                              </Dropdown.Item>
                              <Dropdown.Item
                                href={`/courses/${course.id}/assessments`}
                              >
                                Assessments
                              </Dropdown.Item>
                              <Dropdown.Item href={`/report/courses?courseId=${courseId}`}>Report</Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item onClick={handleShowEdit}>
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => {
                                  setIsActive(false);
                                  dispatch(
                                    isActiveCourse({ courseId, isActive })
                                  );
                                  navigate(0);
                                }}
                              >
                                Archive
                              </Dropdown.Item>
                            </Dropdown.Menu>

                            <CourseEdit
                              showEdit={showEdit}
                              setShowEdit={setShowEdit}
                              id={course.id}
                            />

                            <CourseCreate show={show} setShow={setShow} />
                          </Dropdown>
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
export default CousreScreen;
