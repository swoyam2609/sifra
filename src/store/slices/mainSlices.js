import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },
  },
});

export const { setUserId } = mainSlice.actions;

export default mainSlice.reducer;
