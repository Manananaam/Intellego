import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//fetching all courses
export const fetchAllCourses = createAsyncThunk("/courses", async () => {
  try {
    const token = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get("/api/courses", config);
    return data;
  } catch (error) {
    return error.message;
  }
});

//fetching individual courses with assessments
export const fetchCourseAssessments = createAsyncThunk(
  "/coursesAssessments",
  async (courseId) => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `/api/courses/${courseId}/assessments`,
        config
      );

      return data;
    } catch (error) {
      return error.message;
    }
  }
);

//fetching individual courses with students
export const fetchCourseStudents = createAsyncThunk(
  "/:courseId/students",
  async (courseId) => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `/api/courses/${courseId}/students`,
        config
      );
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
      const token = JSON.parse(localStorage.getItem("jwt"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        "/api/courses",
        {
          name,
          subject,
          gradeLevel,
        },
        config
      );
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
      const token = JSON.parse(localStorage.getItem("jwt"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `/api/courses/${id}`,
        {
          name,
          subject,
          gradeLevel,
        },
        config
      );
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

//archive course
export const isActiveCourse = createAsyncThunk(
  "/courseActive",
  async ({ courseId, isActive }) => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `/api/courses/${courseId}`,
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

export const removeStudent = createAsyncThunk(
  "student/removeStudent",
  async (studentId) => {
    try {
      const { data } = await axios.delete(`/api/students/${studentId}`);
      return studentId;
    } catch (err) {
      // return rejectWithValue(err.message);
      console.log(err);
    }
  }
);

export const addNewStudent = createAsyncThunk(
  "student/addNew",
  async ({ firstName, lastName, courseId }) => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `/api/students/courses/${courseId}`,
        {
          firstName,
          lastName,
        },
        config
      );
      return data.student;
    } catch (err) {
      console.log(err);
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
    builder.addCase(fetchCourseAssessments.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchCourseStudents.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(createCourse.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(editCourse.fulfilled, (state, action) => {
      return state.filter((course) => course.courseId !== action.payload);
    });
    builder.addCase(isActiveCourse.fulfilled, (state, action) => {
      return state.filter((course) => course.isActive);
    });

    //remove Student
    builder.addCase(removeStudent.fulfilled, (state, action) => {
      state.students = state.students.filter(
        (student) => student.id !== action.payload
      );
    });

    // add new student
    builder.addCase(addNewStudent.fulfilled, (state, action) => {
      state.students.push(action.payload);
    });
  },
});

export const selectCourses = (state) => state.courses;
export default courseSlice.reducer;
