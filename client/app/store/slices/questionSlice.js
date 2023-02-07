import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  singleQuestion: {},
};

export const fetchSingleQuestion = createAsyncThunk(
  "question/fetchSingleQuestion",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/questions/${id}`);
      return data.data.question;
    } catch (err) {
      console.error(err);
    }
  }
);

//create a new question
//probably need to add some grabbing of teacher ID in here as well
//also how do we set assessmentId?
//how does this work with questions? will they associate in their own slice?
export const createQuestion = createAsyncThunk(
  "/questionCreate",
  async ({ questionText }) => {
    try {
    const token = JSON.parse(localStorage.getItem("jwt"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post("/api/questions", {
        questionText,
      }, config);
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
      console.log("hi from thunk", id, questionText);
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
    builder.addCase(fetchSingleQuestion.fulfilled, (state, action) => {
      state.singleQuestion = action.payload;
    });
    builder.addCase(editQuestionText.fulfilled, (state, action) => {
      state.singleQuestion = action.payload;
    });
  },
});

export const selectQuestion = (state) => {
  return state.question;
};

export default questionSlice.reducer;
