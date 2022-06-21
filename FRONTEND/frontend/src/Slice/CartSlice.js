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

      if (index === -1) {
        state.carts.push({
          product: action.payload,
          quantity: 1,
        });
        return;
      }
      state.carts[index].quantity += 1;
    },
    addMutiCart: (state, action) => {
      const index = state.carts.findIndex(
        (cart) => cart.product._id === action.payload.product._id,
      );
      console.log(index, action);
      if (index === -1) {
        state.carts.push({
          product: action.payload.product,
          quantity: action.payload.quantity,
        });
        return;
      }
      state.carts[index].quantity += action.payload.quantity;
    },
    changeCart: (state, action) => {
      const index = state.carts.findIndex(
        (cart) => cart.product._id === action.payload.productId,
      );
      if (index !== -1) {
        const quantity = state.carts[index].quantity;
        if (quantity > 0) {
          if (action.payload.increase === -1 && quantity === 1) {
            state.carts.splice(index, 1);
            return;
          }
          state.carts[index].quantity =
            state.carts[index].quantity + action.payload.increase;
        } else {
          state.carts.splice(index, 1);
        }
      }
    },
    removeCart: (state, action) => {
      const index = state.carts.findIndex(
        (cart) => cart.product._id === action.payload.productId,
      );
      if (index !== -1) {
        state.carts.splice(index, 1);
      }
    },
    clearCart: (state, action) => {
      state.carts = [];
    },
  },
});
export const { reducer, actions } = carts;
export const { clearCart, addCart, changeCart, addMutiCart, removeCart } =
  actions;
export default reducer;
