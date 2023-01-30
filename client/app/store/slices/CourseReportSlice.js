import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const asyncHandler = require("express-async-handler");

export const fetchCourseReportAsync = createAsyncThunk(
  "courses/reports/fetchAll", asyncHandler(async() => {
    const { data } = await axios.get("/api/assessments");
    return data;
  }));

export const CourseReportSlice = createSlice ({
  name: "reports",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCourseReportAsync.fulfilled, (state, action) => {
      return action.payload;
    })
  }
})

export const selectCourseReport = (state) => state.reports;
export default CourseReportSlice.reducer;
