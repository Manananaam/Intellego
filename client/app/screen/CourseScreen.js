import React, { useEffect, useState } from "react";
//Bootstrap imports
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

//React related imports
import { useDispatch, useSelector } from "react-redux";
import { selectCourses, fetchAllCourses } from "../store/slices/courseSlices";
import CourseCreate from "../componenets/CourseCreate";
import CourseEdit from "../componenets/CourseEdit";

const CousreScreen = () => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const courses = useSelector(selectCourses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  const handleShow = () => setShow(true);
  const handleShowEdit = () => setShowEdit(true);

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
            ? courses
                .filter((remainingCourse) => remainingCourse.id !== courses.id)
                .map((course) => {
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
                            <Dropdown.Item
                              href={`/courses/${course.id}/students`}
                            >
                              Students
                            </Dropdown.Item>
                            <Dropdown.Item>Assessments</Dropdown.Item>
                            <Dropdown.Item>Report</Dropdown.Item>
                            <Dropdown.Item onClick={handleShowEdit}>
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item>Archive</Dropdown.Item>
                          </Dropdown.Menu>
                          <CourseEdit
                            showEdit={showEdit}
                            setShowEdit={setShowEdit}
                            id={course.id}
                          />
                        </Dropdown>
                      </td>
                    </tr>
                  );
                })
            : null}
        </tbody>
      </Table>

      <Button variant="danger">Archive</Button>

      <CourseCreate show={show} setShow={setShow} />
    </div>
  );
};
export default CousreScreen;
