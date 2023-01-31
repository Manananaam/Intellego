import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCourseReportAsync = createAsyncThunk(
  "courses/report/fetchGrades", async({ courseId }) => {
    try {
      const { data } = await axios.get(`/api/courses/${courseId}/assessments`);
      return data;
    }
    catch (err) {
    next (err)
  }}
  );

export const CourseReportSlice = createSlice ({
  name: "report",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCourseReportAsync.fulfilled, (state, action) => {
      return action.payload;
    })
  }
})

export const selectCourseReport = (state) => state.reports;
export const courseReportReducer = CourseReportSlice.reducer;
