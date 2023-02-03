//data: { assessment: {id, title, userId, courseId, questions:[]}}
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  assessment: {
    assessmentTitle: "",
    questions: [],
    associatedCourses: [],
    isActive: null,
  },
};

//fetch a single assessment by id
export const fetchAssessment = createAsyncThunk("assessment", async (id) => {
  try {
    const response = await axios.get(`/api/assessments/${id}`);
    const assessment = response.data;
    return assessment;
  } catch (err) {
    console.log("ERR with ASSESSMENTSLICE", err);
  }
});

//edit assessment title
export const editAssessmentTitle = createAsyncThunk(
  "assessment/editTitle",
  async (updatedAssessment) => {
    try {
      const id = updatedAssessment.assessmentId;
      const title = updatedAssessment.assessmentTitle;
      const { data } = await axios.put(
        `/api/assessments/${updatedAssessment.assessmentId}`,
        { id, title }
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

//delete question from assessment (on 'edit assessment' page)
export const deleteQuestion = createAsyncThunk(
  "assessment/deleteQuestion",
  async (questionId) => {
    try {
      const { data } = await axios.delete(`/api/questions/${questionId}`);
      return questionId;
    } catch (err) {
      console.error(err);
    }
  }
);

export const assessmentSlice = createSlice({
  name: "assessment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAssessment.fulfilled, (state, action) => {
      state.assessment.assessmentTitle = action.payload.data.assessment.title;
      state.assessment.questions = action.payload.data.assessment.questions;
      state.assessment.isActive = action.payload.data.assessment.isActive;
    });
    builder.addCase(deleteQuestion.fulfilled, (state, action) => {
      state.assessment.questions = state.assessment.questions.filter(
        (quest) => quest.id !== action.payload
      );
    });
  },
});

export const selectAssessment = (state) => {
  return state.assessment;
};

export default assessmentSlice.reducer;
