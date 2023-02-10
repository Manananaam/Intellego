import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  assessments: [],
};

//fetch all assessments
export const fetchAllAssessments = createAsyncThunk(
  "allAssessments",
  async () => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get("/api/assessments", config);
      const assessments = response.data;
      return assessments;
    } catch (err) {
      console.log("ERR with ASSESSMENTSSLICE", err);
    }
  }
);

//create a new assessment
//probably need to add some grabbing of teacher ID in here as well
//also how do we set courseID?
//does the course_assessmentModel associate them?
export const createAssessment = createAsyncThunk(
  "/assessmentCreate",
  async ({ title, questions, courseId }) => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        "/api/assessments",
        {
          title,
          questions,
          courseId,
        },
        config
      );
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

//archiving an assessment - PUT request to change active status
export const isActiveAssessment = createAsyncThunk(
  "/assessmentActive",
  async ({ assessmentId, isActive }) => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `api/assessments/${assessmentId}`,
        {
          isActive,
        },
        config
      );
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const assessmentsSlice = createSlice({
  name: "assessments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAssessments.fulfilled, (state, action) => {
        state.assessments = action.payload.data.assessments;
      })
      .addCase(createAssessment.fulfilled, (state, action) => {
        state.assessments.push(action.payload.data.newAssessment);
      })
      .addCase(isActiveAssessment.fulfilled, (state, action) => {
        return state.assessments.filter((assessment) => assessment.isActive);
      });
    builder;
  },
});

//unsure about structuring below in comparison to the template?
export const selectAllAssessments = (state) => {
  return state.assessments;
};

export default assessmentsSlice.reducer;
