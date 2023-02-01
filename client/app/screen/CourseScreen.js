//React related imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCourses,
  fetchAllCourses,
  isActiveCourse,
} from "../store/slices/courseSlices";
import CourseCreate from "../componenets/CourseCreate";
import CourseEdit from "../componenets/CourseEdit";

//Bootstrap imports
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

//CourseScreen
const CousreScreen = () => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [isActive, setIsActive] = useState(false);

  //Redux
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);

  //Eventhandlers
  const handleShow = () => setShow(true);
  const handleShowEdit = () => setShowEdit(true);

  //Hooks
  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [showEdit, show, isActive]);

  //render
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
                const courseId = course.id;
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
                          <Dropdown.Item
                            href={`/courses/${course.id}/assessments`}
                          >
                            Assessments
                          </Dropdown.Item>
                          <Dropdown.Item>Report</Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item onClick={handleShowEdit}>
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              setIsActive(false);
                              dispatch(isActiveCourse({ courseId, isActive }));
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

      <Button variant="danger">Archive</Button>
    </div>
  );
};
export default CousreScreen;
