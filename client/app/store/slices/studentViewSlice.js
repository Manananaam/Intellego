import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllQuestions = createAsyncThunk(
  "studentView/fetchAllQuestion",
  async ({ assessmentId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/assessments/${assessmentId}/questions`
      );
      return response.data;
    } catch (err) {
      const errMsg = err.response.data.message;
      throw new Error(errMsg);
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
    builder.addCase(fetchAllQuestions.pending, (state, action) => {
      state.isLoadingForFetchAssessmentAndQuestions = true;
      state.errorForFetchQuestions = null;
    });

    builder.addCase(fetchAllQuestions.fulfilled, (state, action) => {
      state.isLoadingForFetchAssessmentAndQuestions = false;
      const { id, title, isActive, userId, questions } =
        action.payload.data.assessment;
      state.assessment = { id, title, isActive, userId };
      state.questions = questions;
    });
    builder.addCase(fetchAllQuestions.rejected, (state, action) => {
      state.isLoadingForFetchAssessmentAndQuestions = false;
      state.errorForFetchQuestions = action.error.message;
    });
  },
});

export const studentViewReducer = studentViewSlice.reducer;