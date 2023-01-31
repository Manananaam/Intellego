//data: { assessment: {id, title, userId, courseId, questions:[]}}
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  assessment: {},
};

export const fetchAssessment = createAsyncThunk("assessment",
async (id) => {
  try{
    const response = await axios.get(`/api/assessments/${id}`);
    const assessment = response.data;
    return assessment;
  } catch (err) {
    console.log("ERR with ASSESSMENTSLICE", err);
  }
})

export const assessmentSlice = createSlice({
  name: "assessment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAssessment.fulfilled, (state, action) => {
      state.assessment = action.payload;
    })
  }
})

export const selectAssessment = (state) => {
  return state.assessment;
}

export default assessmentSlice.reducer;
