//~~~~~~~~~~~~~~~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// react/redux stuff
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

//bootstrap
import { Dropdown } from "react-bootstrap";

//slice methods
import { fetchCourseStudents } from "../store/slices/courseSlices";

//~~~~~~~~~~~~~~~~~~~~~~~~~THE GOOD STUFF~~~~~~~~~~~~~~~~~

const CourseDropdown = (props) => {
  const dispatch = useDispatch();

  const { courses } = props;

  const [currentCourse, setCurrentCourse] = useState({});

  const handleSelectCourse = (course) => {
    setCurrentCourse(course);
    dispatch(fetchCourseStudents(course.id));
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle className="orangeButton">
          {Object.keys(currentCourse).length
            ? currentCourse.name
            : "Select a Course"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {courses && courses.length ? (
            courses.map((el) => {
              return (
                <Dropdown.Item
                  onClick={() => handleSelectCourse(el)}
                  key={el.id}
                >
                  {el.name}
                </Dropdown.Item>
              );
            })
          ) : (
            <Dropdown.Item>no courses</Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default CourseDropdown;
