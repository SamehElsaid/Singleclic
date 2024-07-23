import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductData = createAsyncThunk('product/fetchProductData', async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
});

export const productSlice = createSlice({
  name: 'product',
  initialState: { data: null, loading: true, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
