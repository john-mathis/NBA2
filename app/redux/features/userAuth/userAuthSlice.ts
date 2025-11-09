import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { RootState } from "../../store";
import internalAPI from "@/app/(backend)/api/utils/axios.internal";
import axios from "axios";

type authenticateUserState = {
  user: any | null;
  isAuthenticated: boolean;
  loading: boolean;
};

const initialState: authenticateUserState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

export const fetchUser = createAsyncThunk("authUser/fetchUser", async () => {
  const response = await internalAPI.get("/api/auth/me");
  return response.data.user;
});

const authenticateUser = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    logOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
        state.loading = false;
        state.isAuthenticated = false;
      });
  },
});

export const { loginSuccess, logOut } = authenticateUser.actions;
export default authenticateUser.reducer;
export const selectAuth = (state: RootState) => state.authUser.user;
