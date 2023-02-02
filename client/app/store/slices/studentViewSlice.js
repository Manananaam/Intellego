import { createSlice } from "@reduxjs/toolkit";

const studentViewSlice = createSlice({
  name: "studentView",
  initialState: {},
  reducers: {},
  extraReducers(builder) {},
});

export const studentViewReducer = studentViewSlice.reducer;
