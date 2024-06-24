import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userAdminLoginThunk = createAsyncThunk(
  "user-admin-login",
  async (userCredObj, thunkApi) => {
    let res;
    try {
      if (userCredObj.userType === "admin") {
        const res = await axios.post(
          "http://localhost:5000/adminApi/login",
          userCredObj
        );

        if (res.status === 200) {
          // Store token in local storage/session storage
          localStorage.setItem("token", res.data.payload);
          // Return data
          //console.log(res)
        } else {
          return thunkApi.rejectWithValue(res.data.message);
        }
        return res.data;
      }
      if (userCredObj.userType === "faculty") {
        const res = await axios.post(
          "http://localhost:5000/userApi/login",
          userCredObj
        );
        if (res.status === 200) {
          // Store token in local storage/session storage
          localStorage.setItem("token", res.data.payload);
          localStorage.setItem("currentFaculty",res.data.user.faculty_id)
          // Return data
          //console.log(res)
        } else {
          return thunkApi.rejectWithValue(res.data.message);
        }
        return res.data;
      }
    } catch (err) {
      return thunkApi.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const userAdminSlice = createSlice({
  name: "userAdminLogin",
  initialState: {
    isPending: false,
    loginUserStatus: false,
    currentUser: {},
    errorOccurred: false,
    errorMessage: "",
  },
  reducers: {
    resetState: (state, action) => {
      state.isPending = false;
      state.loginUserStatus = false;
      state.currentUser = {};
      state.errorOccurred = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userAdminLoginThunk.pending, (state, action) => {
        state.isPending = true;
      })
      .addCase(userAdminLoginThunk.fulfilled, (state, action) => {
        state.isPending = false;
        state.loginUserStatus = true;
        //console.log(action.payload)
        state.currentUser = action.payload.user;
        state.errorOccurred = false;
        state.errorMessage = "";
      })
      .addCase(userAdminLoginThunk.rejected, (state, action) => {
        state.isPending = false;
        state.loginUserStatus = false;
        state.currentUser = {};
        state.errorOccurred = true;
        state.errorMessage = action.payload || "Login failed";
      });
  },
});

// Export action creator functions
export const { resetState } = userAdminSlice.actions;

// Export root reducer of this slice
export default userAdminSlice.reducer;