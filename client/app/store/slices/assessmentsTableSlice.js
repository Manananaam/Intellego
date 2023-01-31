import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  assessments: [],
};

export const fetchAllAssessments = createAsyncThunk(
  "allAssessments",
  async () => {
    try {
      const response = await axios.get("/api/assessments");
      const assessments = response.data;
      return assessments;
    } catch (err) {
      console.log("ERR with ASSESSMENTSSLICE", err);
    }
  }
);

export const assessmentsSlice = createSlice({
  name: "assessments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllAssessments.fulfilled, (state, action) => {
      state.assessments = action.payload;
    });
  },
});


//unsure about structuring below in comparison to the template?
export const selectAllAssessments = (state) => {
  return state.assessments;
};

export default assessmentsSlice.reducer;
