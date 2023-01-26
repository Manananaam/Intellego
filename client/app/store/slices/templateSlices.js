import { createSlice } from "@reduxjs/toolkit";

const templateSlice = createSlice({
  name: "template",
  /*
  alwasy initialState with {} for scable, eg:
    initialState: {
      isLoading: false,
      data: [] / {} ,
      error: null
    }
  */
  initialState: {},
  reducers: {
    example(state, action) {},
  },
  extraReducers(builder) {},
});

export const templateReducer = templateSlice.reducer;
export const { example } = templateSlice.actions;
