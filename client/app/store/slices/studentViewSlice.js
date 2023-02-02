import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllQuestions = createAsyncThunk(
  "studentView/fetchAllQuestion",
  async ({ courseId, assessmentId }) => {
    try {
      const response = await axios.get(
        `/api/assessments/${assessmentId}/courses/${courseId}/questions`
      );
      return response.data;
    } catch (err) {
      const errMsg = err.response.data.message;
      throw new Error(errMsg);
    }
  }
);

export const createSubmission = createAsyncThunk(
  "studentView/submitAnswer",
  async ({ courseId, assessmentId, studentId, submission }) => {
    try {
      const { data } = await axios.post(
        `/api/submissions/courses/${courseId}/assessments/${assessmentId}/students/${studentId}`,
        submission
      );
      return data;
    } catch (err) {
      const errMsg = err.response.data.message;
      throw new Error(errMsg);
    }
  }
);

const studentViewSlice = createSlice({
  name: "studentView",
  initialState: {
    // state for fetch assessment and question
    isLoadingForFetchAssessmentAndQuestions: false,
    assessment: null,
    questions: null,
    errorForFetchQuestions: null,
    // state for submission
    isLoadingForSubmission: false,
    submissionSuccess: false,
    errorForSubmission: null,
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

    // createSubmission
    builder.addCase(createSubmission.pending, (state, action) => {
      state.isLoadingForSubmission = true;
      state.submissionSuccess = false;
      state.errorForSubmission = null;
    });
    builder.addCase(createSubmission.fulfilled, (state, action) => {
      state.isLoadingForSubmission = false;
      state.errorForSubmission = null;
      state.submissionSuccess = true;
    });
    builder.addCase(createSubmission.rejected, (state, action) => {
      state.isLoadingForSubmission = false;
      state.submissionSuccess = false;
      state.errorForSubmission = action.error.message;
    });
  },
});

export const studentViewReducer = studentViewSlice.reducer;
