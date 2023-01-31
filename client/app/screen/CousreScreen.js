import React, { useEffect, useState } from "react";
//Bootstrap imports
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

//Redux & Routers
import { useDispatch, useSelector } from "react-redux";
import {
  selectCourses,
  fetchAllCourses,
  createCourse,
  editCourse,
} from "../store/slices/courseSlices";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import CourseCreate from "../componenets/CourseCreate";
import CourseEdit from "../componenets/CourseEdit";

const CousreScreen = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");

  const courses = useSelector(selectCourses);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  const handleShow = () => setShow(true);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    dispatch(createCourse({ name, subject, gradeLevel }));
    setShow(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(editCourse({ name, subject, gradeLevel }));
    setShow(false);
  };

  return (
    <div>
      <h1>Classes</h1>
      <Button variant="primary" onClick={handleShow}>
        Create Class +
      </Button>

      <Table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses && courses.length
            ? courses.map((course) => {
                return (
                  <tr key={course.id}>
                    <td>
                      <Form.Check type="checkbox" />
                    </td>
                    <td>{course.name}</td>
                    <td>{course.subject}</td>
                    <td>{course.gradeLevel}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic"></Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>Students</Dropdown.Item>
                          <Dropdown.Item>Assessments</Dropdown.Item>
                          <Dropdown.Item>Report</Dropdown.Item>
                          <Dropdown.Item onClick={handleShow}>
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item>Archive</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>

      <Button variant="danger">Archive</Button>

      <CourseCreate
        show={show}
        setShow={setShow}
        handleCreateSubmit={handleCreateSubmit}
        setname={setName}
        setsubject={setSubject}
        setgradelevel={setGradeLevel}
      />
    </div>
  );
};
export default CousreScreen;
