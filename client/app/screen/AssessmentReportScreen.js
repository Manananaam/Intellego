import React, { useEffect, useState } from "react";

//Router
import { useSearchParams } from "react-router-dom";

//Bootstrap
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import ButtonGroup from "react-bootstrap/ButtonGroup";

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
    <Container>
      <h1>Assessment Report</h1>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle className="orangeButton" id="dropdown-basic">
          {currentCourse ? currentCourse.name : "Select a Course"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {allcourses && allcourses.length ? (
            allcourses.map((course) => {
              return (
                <Dropdown.Item
                  key={course.id}
                  onClick={() => handleCurrentCourse(course)}
                >
                  {course.name}
                </Dropdown.Item>
              );
            })
          ) : (
            <Dropdown.Item>No courses</Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
      {currentCourse && (
        <Dropdown as={ButtonGroup} style={{ marginLeft: "10px" }}>
          <Dropdown.Toggle className="orangeButton" id="dropdown-basic">
            {currentAssessment
              ? `${currentAssessment.title}`
              : "Select an Assessment"}
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
      {/* <p>{currentAssessment ? currentAssessment.title : null}</p> */}
      {currentAssessment && (
        <Table striped bordered>
          <thead>
            <tr>
              <th>Students</th>
              {assessment && assessment.questions.length ? (
                assessment.questions.map((question) => {
                  return <th key={question.id}>{question.questionText}</th>;
                })
              ) : (
                <th style={{ display: "none" }}> </th>
              )}

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

                    {assessment && assessment.questions.length ? (
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
                          if (submission) {
                            return (
                              <td key={submission.id}>
                                {submission.response.length ? (
                                  submission.response
                                ) : (
                                  <i>no response</i>
                                )}{" "}
                                {submission.grade}
                              </td>
                            );
                          }
                          // else {
                          //   return <td>No Submission Yet</td>;
                          // }
                        } else {
                          return <td key={question.id}>No Submission Yet</td>;
                        }
                      })
                    ) : (
                      <td style={{ display: "none" }}> </td>
                    )}
                    {allGrades > 0 ? (
                      <td>{Math.round(allGrades / numGrades)}</td>
                    ) : (
                      <td>No Grades Yet</td>
                    )}
                  </tr>
                );
              })
            ) : (
              //needs to have matching # of questions
              <tr>
                <td>No students in this class!</td>
                {assessment.questions.map((question) => (
                  <td key={question.id}></td>
                ))}
                <td></td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
      {currentAssessment && assessmentGrades.length ? (
        <h3>
          Overall Class Average:{" "}
          {Math.round(
            assessmentGrades.reduce((total, item) => total + item, 0) /
              assessmentGrades.length
          )}
          %
        </h3>
      ) : (
        <h3> </h3>
      )}
    </Container>
  );
};

export default AssessmentReportScreen;
