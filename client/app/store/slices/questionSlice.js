import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  singleQuestion: {
    id: null,
    questionText: "",
    assessmentId: null,
  },
};

//create a new question
//probably need to add some grabbing of teacher ID in here as well
//also how do we set assessmentId?
//how does this work with questions? will they associate in their own slice?
export const createQuestion = createAsyncThunk(
  "/questionCreate",
  async ({ questionText }) => {
    try {
      const { data } = await axios.post("/api/questions", {
        questionText,
      });
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const editQuestionText = createAsyncThunk(
  "question/editQuestionText",
  async ({ id, questionText }) => {
    try {
      const { data } = await axios.put(`/api/questions/${id}`, {
        questionText,
      });
    } catch (err) {
      console.error(err);
    }
  }
);

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createQuestion.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const selectQuestion = (state) => {
  return state.question;
};

export default questionSlice.reducer;
