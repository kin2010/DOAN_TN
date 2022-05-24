import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const carts = createSlice({
  name: 'carts',
  initialState: {
    carts: [],
  },
  reducers: {
    addCart: (state, action) => {
      const index = state.carts.findIndex(
        (cart) => cart.product._id === action.payload._id,
      );
      console.log(index, action);
      if (index === -1) {
        state.carts.push({
          product: action.payload,
          quantity: 1,
        });
        return;
      }
      state.carts[index].quantity += 1;
    },
  },
});
export const { reducer, actions } = carts;
export const { addCart } = actions;
export default reducer;
