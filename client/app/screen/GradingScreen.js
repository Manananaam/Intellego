// react/redux stuff
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

//slice methods
import {
  selectAssessment,
  fetchAssessment,
  fetchStudentSubmissions,
} from "../store/slices/singleAssessmentSlice";
import { fetchCourseAssessments } from "../store";
import { selectCourses } from "../store/slices/courseSlices";
import { fetchCourseStudents } from "../store/slices/courseSlices";

//components
import CourseDropdown from "../components/CourseDropdown";
import GradeSubmissionTable from "../components/GradeSubmissionTable";
import SubmissionModal from "../components/SubmissionModal";

const GradingScreen = () => {
  // react/redux stuff
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //state variables
  const { assessmentId } = useParams();
  const { assessment } = useSelector(selectAssessment);
  const selectedCourse = useSelector(selectCourses);

  useEffect(() => {
    dispatch(fetchAssessment(assessmentId));
  }, [dispatch]);

  useEffect(() => {
    if (selectedCourse.id) {
      dispatch(
        fetchStudentSubmissions({ assessmentId, courseId: selectedCourse.id })
      );
    }
  }, [selectedCourse]);

  return (
    <>
      <h1>Grading</h1>
      <CourseDropdown courses={assessment.associatedCourses} />
      {selectedCourse && Object.keys(selectedCourse).length ? (
        <>
          <GradeSubmissionTable />
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default GradingScreen;
