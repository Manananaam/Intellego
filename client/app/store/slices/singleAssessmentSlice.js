//data: { assessment: {id, title, userId, courseId, questions:[]}}
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  assessment: {},
};

//fetch a single assessment by id
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

//DELETING an assessment (that has no submissions)
export const deleteAssessment = createAsyncThunk("/deleteAssessment", async ({ assessmentId }) => {
  try {
    await axios.delete(`api/assessments/${assessmentId}`);
  } catch (err) {
    return err.message;
  }
})

//create a new assessment
//probably need to add some grabbing of teacher ID in here as well
//also how do we set courseID?
//does the course_assessmentModel associate them?
//how does this work with questions? will they associate in their own slice?
//{questions: [{...}, {...}]}
export const createAssessment = createAsyncThunk("/assessmentCreate", async({ title, questionText }) => {
  try {
    const { data } = await axios.post("/api/assessments", {
      title,
      questionText,
    });
    return data;
  } catch (err) {
    return err.message;
  }
})

export const assessmentSlice = createSlice({
  name: "assessment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchAssessment.fulfilled, (state, action) => {
      state.assessment = action.payload;
    })
    .addCase(createAssessment.fulfilled, (state, action) => {
      console.log("state.assessment:", state.assessment);
      console.log("action.payload:", action.payload);
      state.assessment = action.payload.data.newAssessment;
    })
    .addCase(deleteAssessment.fulfilled, (state, action) => {
      state.assessment = {};
    })
  }
})

export const selectAssessment = (state) => {
  return state.assessment;
}

export default assessmentSlice.reducer;
