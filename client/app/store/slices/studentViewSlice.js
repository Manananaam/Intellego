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

export const verifyStudentId = createAsyncThunk(
  "studentView/verifyStudentID",
  async ({ studentId, courseId }) => {
    try {
      const { data } = await axios.get(
        `/api/students/verify/${studentId}/courses/${courseId}`
      );
      return data;
    } catch (err) {
      const errMsg = err.response.data.message;
      throw new Error(errMsg);
    }
  }
);

export const editStudent = createAsyncThunk(
  "student/editStudent", async ({ id, firstName, lastName }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/students/${id}`, { firstName, lastName});
      console.log("Here it is", data)
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeStudent = createAsyncThunk(
  "student/removeStudent", async (studentId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/students/${studentId}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
)
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

    // state for verify student ID
    isLoadingForVerifyStudentID: false,
    verifyResult: false,
    errorForVerifyStudentId: null,
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

    // verifyStudentId
    builder.addCase(verifyStudentId.pending, (state, action) => {
      state.isLoadingForVerifyStudentID = true;
      state.verifyResult = false;
      state.errorForVerifyStudentId = null;
    });
    builder.addCase(verifyStudentId.fulfilled, (state, action) => {
      state.isLoadingForVerifyStudentID = false;
      state.errorForVerifyStudentId = null;
      state.verifyResult = action.payload.result;
    });
    builder.addCase(verifyStudentId.rejected, (state, action) => {
      state.isLoadingForVerifyStudentID = false;
      state.verifyResult = false;
      state.errorForVerifyStudentId = action.error.message;
    });
    //edit Student
    builder.addCase(editStudent.fulfilled, (state, action) => {
      state.students = action.payload.students;
    });
    //remove Student
    builder.addCase(removeStudent.fulfilled, (state, action) => {
      // return state.students.filter((student) =>
      // student.studentId !== action.payload.students );
    });
  },
});

export const studentViewReducer = studentViewSlice.reducer;
