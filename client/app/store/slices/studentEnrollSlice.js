import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudentList = createAsyncThunk(
  "student/enroll",
  async ({ courseId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/students/courses/${courseId}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getCourses = createAsyncThunk(
  "courses/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/courses");
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const editStudent = createAsyncThunk(
  "student/editStudent", async (studentId, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/student/${studentId}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const removeStudent = createAsyncThunk(
  "student/removeStudent", async (studentId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/student/${studentId}/courses/${courseId}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
)

const studentEnrollSlice = createSlice({
  name: "studentEnroll",
  initialState: {
    allcourses: null,

    numOfStudents: 0,
    students: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchStudentList.fulfilled, (state, action) => {
      state.numOfStudents = action.payload.numOfStudents;
      state.students = action.payload.students;
    });
    builder.addCase(editStudent.fulfilled, (state, action) => {
      state.students = action.payload.students;
    });
    builder.addCase(getCourses.fulfilled, (state, action) => {
      state.allcourses = action.payload;
    });
  },
});

export const studentEnrollReducer = studentEnrollSlice.reducer;
