import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//fetch a course
export const fetchCourse = createAsyncThunk(
  "/singleCourse/fetchCourse",
  async (courseId) => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      };
      const { data } = await axios.get(`/api/courses/${courseId}`, config);
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

//get report for specific class --ASSESSMENTS
// export const fetchCourseReport = createAsyncThunk(
//   "courses/report/fetchGrades", async(courseId) => {
//     try {
  // const token = JSON.parse(localStorage.getItem("jwt"));
  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   }
  // };
//       const { data } = await axios.get(`/api/courses/${courseId}/submissions`, config);
//       return data;
//     }
//     catch (err) {
//     return rejectWithValue(err.message);
//   }}
//   );

//get report for specific class --ASSESSMENTS
export const fetchCourseReport = createAsyncThunk(
  "courses/report/fetchGrades",
  async (courseId) => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      };
      const { data } = await axios.get(
        `/api/courses/${courseId}/assessment/:assessmentId`, config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

//get report by student
export const fetchOverallGrade = createAsyncThunk(
  `students/courses/:courseId/fetchOverallGrade`,
  async (courseId) => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      };
      const { data } = await axios.get(
        `/api/students/courses/${courseId}/overallGrade`, config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const CourseReportSlice = createSlice({
  name: "report",
  initialState: {
    currentCourse: [],
    courseReport: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourse.fulfilled, (state, action) => {
      state.currentCourse = action.payload;
    });
    builder.addCase(fetchOverallGrade.fulfilled, (state, action) => {
      state.allGrades = action.payload.overallGradeForEachStudent;
    });
  },
});

export const selectCourseReport = (state) => state.report;
export const courseReportReducer = CourseReportSlice.reducer;
