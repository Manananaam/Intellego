//data: { assessment: {id, title, userId, courseId, questions:[]}}
import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  assessment: {
    assessmentTitle: "",
    questions: [],
    associatedCourses: [],
    isActive: null,
  },
  studentSubmissions: [],
  currentSubmission: {},
};

//fetch a single assessment by id
export const fetchAssessment = createAsyncThunk("assessment", async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`/api/assessments/${id}`, config);
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
      const token = JSON.parse(localStorage.getItem("jwt"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const id = updatedAssessment.assessmentId;
      const title = updatedAssessment.assessmentTitle;
      const { data } = await axios.put(
        `/api/assessments/${updatedAssessment.assessmentId}`,
        { id, title },
        config
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

//DELETING an assessment (that has no submissions)
// export const deleteAssessment = createAsyncThunk(
//   "/deleteAssessment",
//   async ({ assessmentId }) => {
//     try {
//       const token = JSON.parse(localStorage.getItem("jwt"));
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       await axios.delete(`api/assessments/${assessmentId}`, config);
//     } catch (err) {
//       return err.message;
//     }
//   }
// );

//delete question from assessment (on 'edit assessment' page)
export const deleteQuestion = createAsyncThunk(
  "assessment/deleteQuestion",
  async (questionId) => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `/api/questions/${questionId}`,
        config
      );
      return questionId;
    } catch (err) {
      console.error(err);
    }
  }
);

//remove course association from assessment
export const removeCourseFromAssessment = createAsyncThunk(
  "/assessment/removeCourseFromAssessment",
  async ({ assessmentId, courseId }) => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `/api/assessments/${assessmentId}/courses/${courseId}`,
        config
      );
      return courseId;
    } catch (err) {
      console.error(err);
    }
  }
);

//add new question to assessment
export const addQuestion = createAsyncThunk(
  "/assessment/addQuestion",
  async ({ assessmentId, questionText }) => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `/api/assessments/${assessmentId}/questions`,
        { questionText: questionText },
        config
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const addAssociatedCourse = createAsyncThunk(
  "assessment/addAssociatedCourse",
  async ({ courseId, assessmentId }) => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `/api/assessments/${assessmentId}/courses/${courseId}`,
        config
      );

      return data;
    } catch (err) {
      console.error(err);
    }
  }
);
//create a new assessment
//probably need to add some grabbing of teacher ID in here as well
//also how do we set courseID?
//does the course_assessmentModel associate them?
//how does this work with questions? will they associate in their own slice?
//{questions: [{...}, {...}]}
export const createAssessment = createAsyncThunk(
  "/assessmentCreate",
  async ({ title, questionText }) => {
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
          questionText,
        },
        config
      );
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

//desc: pull in student submissions for a particular assessment/course combo
export const fetchStudentSubmissions = createAsyncThunk(
  "assessment/fetchStudentSubmissions",
  async ({ assessmentId, courseId }) => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `/api/assessments/${assessmentId}/courses/${courseId}/submissions`,
        config
      );

      return data;
    } catch (err) {
      const errorMessage = err.response.data.message;
      throw new Error(errorMessage);
    }
  }
);

export const fetchSingleSubmission = createAsyncThunk(
  "assessment/fetchSingleSubmission",
  async (subId) => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(`/api/submissions/${subId}`, config);
      return data;
    } catch (err) {
      const errorMessage = err.response.data.message;
      throw new Error(errorMessage);
    }
  }
);

export const submitGrade = createAsyncThunk(
  "assessment/submitGrade",
  async ({ subId, grade, assessmentId, courseId }, { dispatch }) => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `/api/submissions/${subId}`,
        { grade: grade },
        config
      );
      const updatedAllSubs = await dispatch(
        fetchStudentSubmissions({ assessmentId, courseId })
      );

      return data;
    } catch (err) {
      const errorMessage = err.reponse.data.message;
      throw new Error(errorMessage);
    }
  }
);

export const assessmentSlice = createSlice({
  name: "assessment",
  initialState,
  reducers: {
    updateQuestions(state, action) {
      state.assessment.questions = state.assessment.questions.map((el) => {
        if (el.id === action.payload.id) {
          return { ...el, questionText: action.payload.questionText };
        } else {
          return el;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAssessment.fulfilled, (state, action) => {
      state.assessment.assessmentTitle = action.payload.data.assessment.title;
      state.assessment.questions = action.payload.data.assessment.questions;
      state.assessment.isActive = action.payload.data.assessment.isActive;
      state.assessment.associatedCourses = action.payload.data.associatedCourse;
    });
    builder.addCase(deleteQuestion.fulfilled, (state, action) => {
      state.assessment.questions = state.assessment.questions.filter(
        (quest) => quest.id !== action.payload
      );
    });
    builder.addCase(removeCourseFromAssessment.fulfilled, (state, action) => {
      state.assessment.associatedCourses =
        state.assessment.associatedCourses.filter(
          (course) => course.id !== action.payload
        );
    });
    builder.addCase(addAssociatedCourse.fulfilled, (state, action) => {
      state.assessment.associatedCourses.push(action.payload.course);
    });
    builder.addCase(addQuestion.fulfilled, (state, action) => {
      state.assessment.questions.push(action.payload);
    });
    builder.addCase(createAssessment.fulfilled, (state, action) => {
      state.assessment = action.payload.data.newAssessment;
    });
    // builder.addCase(deleteAssessment.fulfilled, (state, action) => {
    //   state.assessment = {};
    // });
    builder.addCase(fetchStudentSubmissions.fulfilled, (state, action) => {
      state.studentSubmissions = action.payload;
    });
    builder.addCase(fetchSingleSubmission.fulfilled, (state, action) => {
      state.currentSubmission = action.payload;
    });
    builder.addCase(submitGrade.fulfilled, (state, action) => {
      state.currentSubmission = action.payload;
    });
  },
});

export const selectAssessment = (state) => {
  return state.assessment;
};

export default assessmentSlice.reducer;
export const { updateQuestions } = assessmentSlice.actions;
