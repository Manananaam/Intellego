import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import courseSlice from "./slices/courseSlices";

// From templateSlices
import { templateReducer } from "./slices/templateSlices";

const store = configureStore({
  reducer: {
    template: templateReducer,
    courses: courseSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

export { example } from "./slices/templateSlices";
