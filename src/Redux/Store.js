import { configureStore } from "@reduxjs/toolkit";
import Loading from "./LoadingSlice/LoadingSlice";
const store = configureStore({
  reducer: {
    Loading,
  },
});
export default store;
