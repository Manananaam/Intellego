import { createSlice } from "@reduxjs/toolkit";

const templateSlice = createSlice({
  name: "template",
  /*
  always initialState with {} for scalablility, eg:
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
