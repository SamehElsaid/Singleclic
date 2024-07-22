import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: true,
};

const loading = createSlice({
  name: "loading",
  initialState,
  reducers: {
    SET_ACTIVE_App: (state) => {
      state.data = false;
    },
  },
});

export let { SET_ACTIVE_App } = loading.actions;

export default loading.reducer;
