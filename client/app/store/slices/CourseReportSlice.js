import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCourseReport = createAsyncThunk(
  "courses/report/fetchGrades", async({ courseId }) => {
    try {
      const { data } = await axios.get(`/api/courses/${courseId}/assessments`);
      console.log(data)
      return data;
    }
    catch (err) {
    next (err)
  }}
  );

  export const fetchCourseList = createAsyncThunk(
    "courses/:courseId/fetchCourse", async({ courseId }) => {
      try {
        const { data } = await axios.get(`/api/courses/${courseId}/assessments`);
        console.log(data)
        return data;
      }
      catch (err) {
      next (err)
    }}
    );
//route to put in course id and you get back all grades for the course and it includes grades
    export const fetchSubmissions = createAsyncThunk("courses/:courseId/assessments/:assessmentId/submissions", async({ courseId }) => {
      try {
        const { data } = await axios.get(`/apicourses/:courseId/assessments/:assessmentId/submissions`);
        console.log(data)
        return data;
      }
      catch (err) {
        next (err)
      }
    });

    export const fetchGradeForEachAssessment = createAsyncThunk(
      "report/student/fetchGradeForEachAssessment",
      async ({ studentId, courseId }, { rejectWithValue }) => {
        try {
          const { data } = await axios.get(
            `/api/students/${studentId}/courses/${courseId}/assessments`
          );
          console.log(data)
          return data;
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
    );

export const CourseReportSlice = createSlice ({
  name: "report",
  initialState: {
    //array of all the teacher's courses
    allCourses: [],
    //currently selected course
    currentCourse: 0,
    //list of grades from current course
    allGrades: [],
    id: 0

  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourseReport.fulfilled, (state, action) => {
      state.currentCourse = action.payload.currentCourse;
    });
    builder.addCase(fetchCourseList.fulfilled, (state, action) => {
      state.allCourses = action.payload.allCourses;
    });
    builder.addCase(fetchGradeForEachAssessment.fulfilled, (state, action) => {
      state.allGrades = action.payload.allGrades;
    })
  }
});

export const selectCourseReport = (state) => state.report;
export const courseReportReducer = CourseReportSlice.reducer;
