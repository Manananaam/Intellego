import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//fetching all courses
export const fetchAllCourses = createAsyncThunk("/courses", async () => {
  try {
    const { data } = await axios.get("/api/courses");
    return data;
  } catch (error) {
    return error.message;
  }
});

//fetching all courses with assessments
export const fetchCourseAssesments = createAsyncThunk(
  "/coursesAssessments",
  async (courseId) => {
    try {
      const { data } = await axios.get(`/api/${courseId}/assessments`);
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

//fetching all courses with students
export const fetchCourseStudents = createAsyncThunk(
  "/coursesStudents",
  async (courseId) => {
    try {
      const { data } = await axios.get(`/api/${courseId}/students`);
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

//create course
export const createCourse = createAsyncThunk(
  "/courseCreate",
  async ({ name, subject, gradeLevel }) => {
    try {
      const { data } = await axios.post("/api/courses", {
        name,
        subject,
        gradeLevel,
      });
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

//edit course
export const editCourse = createAsyncThunk(
  "/courseEidt",
  async ({ id, name, subject, gradeLevel }) => {
    try {
      const { data } = await axios.put(`/api/courses/${id}`, {
        name,
        subject,
        gradeLevel,
      });
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

//Slices
export const courseSlice = createSlice({
  name: "courses",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCourses.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchCourseAssesments.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchCourseStudents.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(createCourse.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(editCourse.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectCourses = (state) => state.courses;
export default courseSlice.reducer;
