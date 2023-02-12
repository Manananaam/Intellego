import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//@desc: user login
export const login = createAsyncThunk("authentication/login", async (user) => {
  //user will be an object that contains at least "email" and "password" values for user
  try {
    console.log("logging user info", user);
    const { data } = await axios.post("api/authentication/login", user);
    //this should return the user data, except for the password
    console.log("hello from thunk, here is data", data);
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
});

//@desc: user signup
export const signup = createAsyncThunk(
  "authentication/signup",
  async (user) => {
    //note: user should be an object with at least firstname, lastname, email, password
    try {
      const { data } = await axios.post("/api/authentication/signup", user);
      return data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }
);
//@desc: get user info
export const getUserInfo = createAsyncThunk("authentication/user", async () => {
  try {
    const token = JSON.parse(localStorage.getItem("jwt"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get("api/authentication/user", config);
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
});
//@desc: user logout

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    //if the user info is saved in local storage, then that is the user saved in the auth state - otherwise, user is null
    error: false,
    //isLogged: false
  },
  reducers: {
    logout(state, action) {
      state.user = null;
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
    },
    clearAttempt(state, action) {
      state.error = null;
    },
  },

  extraReducers(builder) {
    //reducers related to user login
    //1. add isLoading=true while login process is pending
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    //2. add reducer for successful login
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(
        "hello from reducer, about to log action payload",
        action.payload
      );

      state.user = action.payload.user;
      localStorage.setItem("jwt", JSON.stringify(action.payload.token));
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      /*
      note - not sure it is best practice to store jwt in localstorage-- have read different things -- as a stretch goal, it might be good to try and use cookies:
      https://stackoverflow.com/questions/44133536/is-it-safe-to-store-a-jwt-in-localstorage-with-reactjs
      */
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
      console.log("whoopsie");
    });
    //could add in case for login.rejected eventually

    //reducers related to new user signup
    //1. add isLoading=true while signup process is pending
    builder.addCase(signup.pending, (state, action) => {
      state.isLoading = true;
    });
    //2. reducer for successful user signup
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      localStorage.setItem("jwt", JSON.stringify(action.payload.token));
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      //see above note - may try to use cookies instead of adding jwt to localstorage
      //add in signup.rejected case later on
    });
    //could add extra reducers for getting user info
  },
});

export const authReducer = authSlice.reducer;
export const { logout, clearAttempt } = authSlice.actions;
export const selectAuthState = (state) => state.auth;
