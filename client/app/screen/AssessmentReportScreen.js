import React, { useEffect, useState } from "react";

//Router
import { useSearchParams } from "react-router-dom";

//Bootstrap
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";

//redux
import {
  getCourses,
  fetchStudentList,
  fetchAssessment,
  fetchGradeForEachAssessment,
} from "../store";
import { fetchCourseAssessments } from "../store";
import { useDispatch, useSelector } from "react-redux";

const AssessmentReportScreen = () => {
  const dispatch = useDispatch();

  // use router hook to fetch current courseId
  let [searchParams, setSearchParams] = useSearchParams();

  const [courseId, assessmentId] = [
    Number(searchParams.get("courseId")),
    Number(searchParams.get("assessmentId")),
  ];

  // initial current course and current student
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentAssessment, setCurrentAssessment] = useState(null);

  // redux state
  // fetch a list of courses managed by current user
  const { allcourses } = useSelector((state) => state.studentEnroll);
  //need a course with list of assessments that belong to that course
  const courses = useSelector((state) => state.courses);
  //grabbing all students for a course
  const students = useSelector((state) => state.studentEnroll);
  //grabbing the questions and submissions for the given assessment
  const assessment = useSelector((state) => state.assessment.assessment);

  // finding a place to house these grades
  let assessmentGrades = [];

  //useEffect here to update the assessments fetch based on course id change
  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseAssessments(courseId));
      dispatch(fetchStudentList({ courseId }));
    }
  }, [courseId]);

  //useEffect here to update the single assessment fetch based on assessmentId change
  useEffect(() => {
    if (assessmentId) {
      dispatch(fetchAssessment(assessmentId));
    }
  }, [assessmentId]);

  // update current course, current assessment
  useEffect(() => {
    if (
      courses &&
      Object.keys(courses).length &&
      courses.id === courseId &&
      courses.assessments
    ) {
      setCurrentCourse(courses);
      setCurrentAssessment(
        courses.assessments.find((el) => el.id === assessmentId)
      );
    }
  }, [courses, courseId, assessmentId]);

  // fetch a list of courses to display at course dropdown menu
  useEffect(() => {
    dispatch(getCourses());
  }, []);

  // update current course when user clicks dropdown item
  const handleCurrentCourse = (course) => {
    searchParams.set("courseId", course.id);
    setSearchParams(searchParams);
  };

  // update current assessment when user clicks dropdown item
  const handleCurrentAssessment = (assessment) => {
    searchParams.set("assessmentId", assessment.id);
    setSearchParams(searchParams);
  };

  return (
    <>
      <h1>Assessment Report Screen</h1>
      <Dropdown>
        <Dropdown.Toggle variant='primary' id='dropdown-basic'>
          {currentCourse ? currentCourse.name : "Course"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {allcourses &&
            allcourses.length &&
            allcourses.map((course) => {
              return (
                <Dropdown.Item
                  key={course.id}
                  onClick={() => handleCurrentCourse(course)}
                >
                  {course.name}
                </Dropdown.Item>
              );
            })}
        </Dropdown.Menu>
      </Dropdown>
      <br />
      {currentCourse && (
        <Dropdown>
          <Dropdown.Toggle variant='primary' id='dropdown-basic'>
            {currentAssessment ? `${currentAssessment.title}` : "Assessment"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {courses &&
              courses.id === courseId &&
              courses.assessments.map((assessment) => {
                return (
                  <Dropdown.Item
                    key={assessment.id}
                    onClick={() => handleCurrentAssessment(assessment)}
                  >
                    {assessment.title}
                  </Dropdown.Item>
                );
              })}
          </Dropdown.Menu>
        </Dropdown>
      )}
      <br />
      <h2>
        {currentAssessment ? currentAssessment.title : "No Assessment Selected"}
      </h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Students</th>
            {assessment &&
              assessment.questions.length &&
              assessment.questions.map((question) => {
                return <th key={question.id}>{question.questionText}</th>;
              })}
            <th>Average</th>
          </tr>
        </thead>
        <tbody>
          {students && students.students.length ? (
            students.students.map((student) => {
              let allGrades = 0;
              let numGrades = 0;
              return (
                <tr key={student.id}>
                  <td>{`${student.firstName} ${student.lastName}`}</td>
                  {assessment &&
                    assessment.questions.length &&
                    assessment.questions.map((question) => {
                      if (question.submissions.length) {
                        let submission = question.submissions.find(
                          (el) => el.studentId === student.id
                        );
                        allGrades += submission.grade;
                        numGrades++;
                        assessmentGrades.push(
                          Math.round(allGrades / numGrades)
                        );
                        return (
                          <td key={submission.id}>
                            {submission.response} {submission.grade}
                          </td>
                        );
                      }
                    })}
                  <td>{Math.round(allGrades / numGrades)}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>No students in this class!</td>
            </tr>
          )}
        </tbody>
      </Table>
      <h3>
        Overall Class Average:{" "}
        {Math.round(
          assessmentGrades.reduce((total, item) => total + item, 0) /
            assessmentGrades.length
        )}
        %
      </h3>
    </>
  );
};

export default AssessmentReportScreen;
