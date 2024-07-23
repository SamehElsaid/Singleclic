import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: JSON.parse(localStorage.getItem("cart")) ?? [],
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    SET_CART: (state, action) => {
      state.data = action.payload;
    },
  },
});

export let { SET_CART } = cart.actions;

export default cart.reducer;
