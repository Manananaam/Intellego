import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//@desc: user login
export const login = createAsyncThunk("authentication/login", async (user) => {
  //user will be an object that contains at least "email" and "password" values for user
  try {
    const { data } = await axios.post("authentication/login", user);
    //this should return the user data, except for the password
    return data;
  } catch {
    throw new Error(error.response.data);
  }
});
//@desc: user logout
//@desc: user signup
//@desc: get user info

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    //if the user info is saved in local storage, then that is the user saved in the auth state - otherwise, user is null
    //error: null,
    //isLogged: false
  },
  reducers: {},
  extraReducers(builder) {
    //reducers related to user login
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export const authReducer = authSlice.reducer;
export const selectAuthState = (state) => state.auth;
/*
export const { specificReducerFromSlice, anotherReducer } = authSlice.actions
*/
