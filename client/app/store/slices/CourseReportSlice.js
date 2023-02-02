import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCourseList = createAsyncThunk("/courses", async () => {
  try {
    const data = await axios.get("/api/courses");
    return data;
  } catch (error) {
    return rejectWithValue(err.message);
  }
});

//fetch a course
export const fetchCourse = createAsyncThunk(
  "/coursesAssessments",
  async (courseId) => {
    try {
      const { data } = await axios.get(`/api/courses/${courseId}`);
      return data;
    } catch (error) {
      return error.message;
    }
  }
);


// //route to put in course id and you get back all grades for the course and it includes grades?
// export const fetchSubmissions = createAsyncThunk(`courses/:courseId/assessments/:assessmentId/submissions`, async({ courseId }) => {
//   try {
//     const { data } = await axios.get(`/apicourses/${courseId}/assessments/${assessmentId}/submissions`);
//     return data;
//   }
//   catch (err) {
//   return rejectWithValue(err.message);
//   }
// });


//get report for specific class
export const fetchCourseReport = createAsyncThunk(
  "courses/report/fetchGrades", async({ courseId }) => {
    try {
      const data = await axios.get(`/api/courses/${courseId}/assessments`);
      return data;
    }
    catch (err) {
    return rejectWithValue(err.message);
  }}
  );


    // export const fetchGradeForEachAssessment = createAsyncThunk(
    //   "report/student/fetchGradeForEachAssessment",
    //   async ({ courseId }) => {
    //     try {
    //       const data = await axios.get(
    //         `/api/courses/${courseId}/submissions`
    //       );
    //       return data;
    //     } catch (err) {
    //       return rejectWithValue(err.message);
    //     }
    //   }
    // );

export const CourseReportSlice = createSlice ({
  name: "report",
  initialState: {
    //array of all the teacher's courses
    allCourses: [],
    //currently selected course
    currentCourse: [],
    //list of grades from current course
    allGrades: [],
    //user id
    id: 0
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourse.fulfilled, (state, action) => {
      console.log(action.payload)
      state.currentCourse = action.payload;
    });
    builder.addCase(fetchCourseList.fulfilled, (state, action) => {
      state.allCourses = action.payload;
    });
    builder.addCase(fetchCourseReport.fulfilled, (state, action) => {
      state.allGrades = action.payload.allGrades;
    })
  }
});

export const selectCourseReport = (state) => state.report;
export const courseReportReducer = CourseReportSlice.reducer;
