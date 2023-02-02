import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllQuestions = createAsyncThunk(
  "studentView/fetchAllQuestion",
  async ({ assessmentId }) => {
    try {
      const { data } = await axios.get(`/api/assessments/${assessmentId}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

const studentViewSlice = createSlice({
  name: "studentView",
  initialState: {
    isLoadingForFetchAssessmentAndQuestions: false,
    assessment: null,
    questions: null,
    errorForFetchQuestions: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllQuestions.fulfilled, (state, action) => {
      state.isLoadingForFetchQuestions = false;
      const { id, title, isActive, userId, questions } =
        action.payload.data.assessment;
      state.assessment = { id, title, isActive, userId };
      state.questions = questions;
    });
  },
});

export const studentViewReducer = studentViewSlice.reducer;
