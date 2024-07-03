import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  userData: {},
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },
  },
});

export const { setUserId, setUserData } = mainSlice.actions;

export default mainSlice.reducer;
