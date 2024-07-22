import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice/authSlice";
const store = configureStore({
  reducer: {
    auth,
  },
});
export default store;
