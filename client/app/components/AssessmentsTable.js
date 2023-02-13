import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllAssessments,
  selectAllAssessments,
  isActiveAssessment,
  deleteAssessment,
} from "../store/slices/assessmentsTableSlice";
import { selectCourses, fetchAllCourses } from "../store/slices/courseSlices";
import { assessmentSlice } from "../store/slices/singleAssessmentSlice";
import Table from "react-bootstrap/Table";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ArchiveFill,
  Archive,
  Trash3,
  InfoSquareFill,
  TrashFill,
} from "react-bootstrap-icons";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";

const AssessmentsTable = () => {
  const [isActive, setIsActive] = useState(false);
  const allAssessments = useSelector(selectAllAssessments).assessments;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courses = useSelector(selectCourses);
  const [show, setShow] = useState(false);
  const target = useRef(null);

  useEffect(() => {
    dispatch(fetchAllAssessments());
    dispatch(fetchAllCourses());
  }, [dispatch]);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              Assessment{" "}
              {<InfoSquareFill ref={target} onClick={() => setShow(!show)} />}
            </th>
            <Overlay target={target.current} show={show} placement='right'>
              {(props) => (
                <Tooltip {...props}>Click an assessment to make edits.</Tooltip>
              )}
            </Overlay>
            {courses && courses.length ? (
              courses.map((course) => {
                return <th key={course.id}>{course.name}</th>;
              })
            ) : (
              <th>No Courses Yet!</th>
            )}
            <th>Average</th>
            <th>{<TrashFill />}</th>
          </tr>
        </thead>
        <tbody>
          {allAssessments && allAssessments.length ? (
            allAssessments
              .filter((assessment) => {
                return assessment.isActive;
              })
              .map((assessment) => {
                let questionAverageArr = [];
                const assessmentId = assessment.id;
                return (
                  <tr key={assessment.id}>
                    <td>
                      <NavLink to={`/assessments/${assessment.id}`}>
                        {assessment.title}
                      </NavLink>
                    </td>
                    {courses && courses.length
                      ? courses.map((course) => {
                          const map = assessment.courses.map((el) => {
                            return course.id === el.id;
                          });
                          if (assessment.courses.length && map.includes(true)) {
                            let courseGrades = [];
                            assessment.questions.map((question) => {
                              let questionsArr = [];
                              question.submissions.map((submission) => {
                                if (
                                  submission.courseId === course.id &&
                                  submission.grade
                                ) {
                                  questionsArr.push(submission.grade);
                                }
                              });
                              if (questionsArr.length) {
                                courseGrades.push(
                                  Math.round(
                                    questionsArr.reduce(
                                      (total, item) => total + item,
                                      0
                                    ) / questionsArr.length
                                  )
                                );
                              }
                            });
                            if (courseGrades.length) {
                              return (
                                <td key={course.id}>
                                  {Math.round(
                                    courseGrades.reduce(
                                      (total, item) => total + item,
                                      0
                                    ) / courseGrades.length
                                  )}
                                </td>
                              );
                            } else {
                              return <td key={course.id}>Missing Grades</td>;
                            }
                          } else {
                            return <td key={course.id}>Not Assigned</td>;
                          }
                        })
                      : null}
                    {assessment.questions && assessment.questions.length
                      ? assessment.questions.map((question) => {
                          if (
                            question.submissions &&
                            question.submissions.length
                          ) {
                            let sum = 0;
                            question.submissions.forEach((submission) => {
                              if (submission.grade) {
                                sum += submission.grade;
                              }
                            });
                            let questionAverage = Math.round(
                              sum / question.submissions.length
                            );
                            questionAverageArr.push(questionAverage);
                          }
                        })
                      : null}
                    {questionAverageArr.length ? (
                      <td>
                        {Math.round(
                          questionAverageArr.reduce(
                            (total, item) => total + item,
                            0
                          )
                        ) / questionAverageArr.length}
                      </td>
                    ) : (
                      <td>{`Missing ${
                        !assessment.questions.length ? "Questions" : "Grades"
                      }`}</td>
                    )}
                    <td>
                      {assessment.questions.filter((question) => {
                        return question.submissions.length > 0;
                      }).length ? (
                        <Trash3
                          onClick={() => {
                            setIsActive(false);
                            dispatch(
                              isActiveAssessment({ assessmentId, isActive })
                            );
                          }}
                        />
                      ) : (
                        <Trash3
                          onClick={() => {
                            dispatch(deleteAssessment({ assessmentId }));
                          }}
                        />
                      )}
                    </td>
                  </tr>
                );
              })
          ) : (
            <tr>
              <td>No Assessments Yet!</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

//courseId

export default AssessmentsTable;
