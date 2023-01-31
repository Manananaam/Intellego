import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//fetch individual student's grade for each assessment
export const fetchGradeForEachAssessment = createAsyncThunk(
  "report/student/fetchGradeForEachAssessment",
  async ({ studentId, courseId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/api/students/${studentId}/courses/${courseId}/assessments`
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const studentReportSlice = createSlice({
  name: "template",
  initialState: {
    student: null,
    grades: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchGradeForEachAssessment.fulfilled, (state, action) => {
      state.student = action.payload.student;
      state.grades = action.payload.listOfGrade;
    });
  },
});

export const studentReportReducer = studentReportSlice.reducer;
