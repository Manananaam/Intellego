import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  question: {},
}

//create a new question
//probably need to add some grabbing of teacher ID in here as well
//also how do we set assessmentId?
//how does this work with questions? will they associate in their own slice?
export const createQuestion = createAsyncThunk("/questionCreate", async({ questionText }) => {
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
})

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createQuestion.fulfilled, (state, action) => {
      state.push(action.payload);
    })
  }
})

export const selectQuestion = (state) => {
  return state.question;
}

export default questionSlice.reducer;
