"use client";

import { mockUserData } from "@/api/mockUserData";
import { createSlice } from "@reduxjs/toolkit";
const {email, password, displayName, id, uid} = mockUserData

const initialState = {
  status: "checking",
  id: null,
  uid: null,
  email: null,
  displayName: null,
  // photoURL: null,
  // errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, { payload }) => {
      state.status = "authenticated";
      // state.id = payload.id;
      // state.uid = payload.uid;
      // state.email = payload.email;
      // state.displayName = payload.displayName;
      // state.photoURL = payload.photoURL;
      // state.errorMessage = null;
      console.log(payload);
    },
    logout: (state) => {
      state.status = "non-authenticated";

      // state.uid = null;
      // state.email = null;
      // state.displayName = null;
      // console.log(state)
      // state.photoURL = null;
      // state.errorMessage = payload.errorMessage;
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    },
  },
});

export const authReducer = authSlice.reducer;
export const { login, logout, checkingCredentials } = authSlice.actions;
