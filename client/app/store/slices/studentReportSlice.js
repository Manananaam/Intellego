import { createSlice } from "@reduxjs/toolkit";

const studentReportSlice = createSlice({
  name: "template",
  initialState: {},
  reducers: {},
  extraReducers(builder) {},
});

export const studentReportReducer = studentReportSlice.reducer;
