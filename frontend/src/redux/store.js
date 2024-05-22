import { configureStore } from "@reduxjs/toolkit";
import userAdminReducer from "./slices/userAdminSlice";

export const reduxStore = configureStore({
  reducer: {
    userAdminLoginReducer: userAdminReducer,
  },
});
