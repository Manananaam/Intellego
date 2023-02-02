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
      const response = await axios.get("/api/assessments");
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

export const assessmentsSlice = createSlice({
  name: "assessments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllAssessments.fulfilled, (state, action) => {
      state.assessments = action.payload.assessments;
    })
    .addCase(createAssessment.fulfilled, (state, action) => {
      state.assessments.push(action.payload.data.newAssessment);
    })
  },
});


//unsure about structuring below in comparison to the template?
export const selectAllAssessments = (state) => {
  return state.assessments;
};

export default assessmentsSlice.reducer;
