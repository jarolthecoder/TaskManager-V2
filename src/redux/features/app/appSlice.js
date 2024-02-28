"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem("theme") || "dark",
};

export const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", JSON.stringify(state.theme));
    },
  },
});

export const appReducer = appSlice.reducer;
export const { toggleTheme } = appSlice.actions;
