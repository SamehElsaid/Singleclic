import { configureStore } from "@reduxjs/toolkit";
import Loading from "./LoadingSlice/LoadingSlice";
import Cart from "./CartSlice/CartSlice";
import product from "./ProductSlice/ProductSlice";

const store = configureStore({
  reducer: {
    Loading,
    Cart,
    product,
  },
});
export default store;
