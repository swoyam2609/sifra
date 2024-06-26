import { configureStore } from "@reduxjs/toolkit";
import mainSlices from "./slices/mainSlices";

const store = configureStore({
  reducer: {
    main: mainSlices,
  },
});

export default store;
