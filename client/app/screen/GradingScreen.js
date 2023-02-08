//~~~~~~~~~~~~~~~~~~~~~~IMPORTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

//~~~~~~~~~~~~~~~~~~~~~~~~~THE GOOD STUFF~~~~~~~~~~~~~~~~~
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
      <h1>howdy, it is time to grade, pardner</h1>
      <CourseDropdown courses={assessment.associatedCourses} />
      {selectedCourse && Object.keys(selectedCourse).length ? (
        <GradeSubmissionTable />
      ) : (
        ""
      )}
    </>
  );
};

export default GradingScreen;

/*
what is the purpose of this page?
when looking at all assessments, you click the grade link to review and/or submit new grades for a particular assessment

what does this screen look like?

heading - "GRADES"

dropdown - select course (choose from all courses associated with this assessment)
###if no course is selected, don't display anything / maybe display a message saying "Please select a course"
###if a course is selected with no submissions, display a message saying that no submissions have been received,
maybe with a hyperlink (send to students with this link)
Q - should a teacher be able to select an archived course from the dropdown? should they be sorted at the bottom? any indication that they are archived?

if a course is selected and it has active submissions, display a table with the following info:
#column of students
#column for each question:
###if the question hasn't been graded, a link that says 'enter grade'
###if the question has been graded, display the grade and then put a pencil next to it in case they want to edit that grade
#column of student's overall average (if grades have been entered)
at the bottom, maybe display overall averages for each question and overall total average?

modal/drawer/popup/...?
when you click on a particular student, this element comes up and displays the following:
- question text
- the student's answer
- the grade (from 1-100)



don't forget:
tryyyyy to be dryyyyy
add link to assessment table to get to this page for each asssesment
add routes (ask amy if you need help)


*/
