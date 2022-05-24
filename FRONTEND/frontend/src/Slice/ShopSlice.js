import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ProductApi from '../app/ProductApi';
export const getAllProducts = createAsyncThunk(
  '/products/getall',
  async (params, APIthunk) => {
    console.log(params);
    const res = await ProductApi.getAll(params);
    return res;
  },
);
const products = createSlice({
  name: 'products',
  initialState: {
    products: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    [getAllProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    [getAllProducts.pending]: (state, action) => {
      state.isLoading = true;
    },
  },
});
const { reducer, actions } = products;
export default reducer;

// extraReducers: (builder) => {
//   // Xử lý logic khi endpoint login được fulfilled
//   builder.addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
//     // Lưu thông tin user vào state
//     state.currentUser = action.payload;
//   });
// },