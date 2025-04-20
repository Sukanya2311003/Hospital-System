import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    authenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthenticated: (state, {payload}) => {
      state.authenticated =  payload;
    }
  },
});

export const { setUser, setAuthenticated } = userSlice.actions;
