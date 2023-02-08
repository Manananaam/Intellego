import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllAssessments,
  selectAllAssessments,
  isActiveAssessment,
} from "../store/slices/assessmentsTableSlice";
import {
  selectCourses,
  fetchAllCourses,
  isActiveCourse,
} from "../store/slices/courseSlices";
import { assessmentSlice, deleteAssessment } from "../store/slices/singleAssessmentSlice";
import Table from "react-bootstrap/Table";
import { NavLink, useNavigate } from "react-router-dom";
import { ArchiveFill, Archive, Trash3 } from "react-bootstrap-icons";

const AssessmentsTable = () => {
  const [isActive, setIsActive] = useState(false);
  const allAssessments = useSelector(selectAllAssessments).assessments;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const singleAssessment = useSelector(selectAssessment).assessment;
  const courses = useSelector(selectCourses);

  console.log("courses are:", courses)

  useEffect(() => {
    dispatch(fetchAllAssessments());
    dispatch(fetchAllCourses());
  }, [dispatch]);


  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Assessment</th>
            {courses && courses.length ? courses.map((course) => {
              return (
                <th key={course.id}>{course.name}</th>
              )
            }) : <th>No Courses Yet!</th>}
            <th>Average</th>
            <th>{<ArchiveFill />}</th>
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
                let missing = "Grades";
                return (
                <tr key={assessment.id}>
                  <td>
                    <NavLink to={`/assessments/${assessment.id}`}>
                      {assessment.title}
                    </NavLink>
                  </td>
                  <td>Average for Course % Here</td>
                  {assessment.questions && assessment.questions.length ? assessment.questions.map((question) => {
                    if (question.submissions && question.submissions.length) {
                      let sum = 0;
                      question.submissions.forEach((submission) => {
                        if (submission.grade) {
                        sum += submission.grade;
                        }
                      });
                      let questionAverage = Math.round(sum / question.submissions.length);
                      questionAverageArr.push(questionAverage);
                    }
                  })
                   : missing = "Questions"}
                   {questionAverageArr.length ? <td>{Math.round(questionAverageArr.reduce((total , item) => total + item, 0)) / questionAverageArr.length}</td> : <td>{`Missing ${missing}`}</td>}
                  <td>
                    {assessment.questions.filter(
                      (question) => {return question.submissions.length > 0}
                    ).length ? (
                      <Archive
                        onClick={() => {
                          setIsActive(false);
                          dispatch(
                            isActiveAssessment({ assessmentId, isActive })
                          );
                          navigate(0)
                        }}
                      />
                    ) : (
                      <Trash3 onClick={() => {
                      dispatch(deleteAssessment({assessmentId}));
                      navigate(0)
                      }}/>
                    )}
                  </td>
                </tr>
                )
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
