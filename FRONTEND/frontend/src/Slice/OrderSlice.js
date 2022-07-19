import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import OrderApi from "../app/OrderApi";
import { getRoleID } from "../Utils/Common";
export const createOrder = createAsyncThunk(
  "/orders/create",
  async (params, APIthunk) => {
    const res = await OrderApi.create(params);
    return res;
  }
);
export const updateOrder = createAsyncThunk(
  "/orders/update",
  async (params, APIthunk) => {
    const res = await OrderApi.update(params);
    return res;
  }
);
export const myOrder = createAsyncThunk(
  "/orders/myorder",
  async (params, APIthunk) => {
    const res = await OrderApi.myorder(params);
    return res;
  }
);
export const payment = createAsyncThunk(
  "/orders/payment",
  async (params, APIthunk) => {
    const res = await OrderApi.payment(params);
    return res;
  }
);
export const getallOrder = createAsyncThunk(
  "/orders/getall",
  async (params, APIthunk) => {
    const res = await OrderApi.getall(params);
    return res;
  }
);
const order = createSlice({
  name: "orderSlice",
  initialState: {
    orders: [],
    allOrder: [],
    bill: [],
    orderDetail: null,
    isLoading: false,
    urlPayment: null,
    isPaymentLoading: false,
    orderUpdate: [],
    delivery: [],
    billCopy: [],
  },
  reducers: {
    deliveryAction: (state, action) => {
      console.log(action, getRoleID());

      const index = state.orders.findIndex((i) => i._id === action.payload);
      state.delivery = state.orders[index];
      return;
    },
    orderdetail: (state, action) => {
      // if (getRoleID() === "Admin") {
      //   const index = state.orders.findIndex((i) => i._id === action.payload);
      //   if (index === -1) {
      //     const index = state.orderHistory.findIndex(
      //       (i) => i._id === action.payload
      //     );
      //     state.orderDetail = state.orderHistory[index];
      //     return;
      //   }
      //   state.orderDetail = state.orders[index];
      //   return;
      // }
      const index = state.allOrder.findIndex((i) => i._id === action.payload);
      state.orderDetail = state.allOrder[index];
      console.log(index, action.payload, state.orderDetail);
    },
    mapping: (state, action) => {
      state.mapping = [];
      if (state.orderDetail) {
        state.orderDetail.product.map((a, b) => {
          const index = state.mapping.findIndex((i) => i.product._id === a._id);
          if (index === -1) {
            state.mapping.push({ product: a, quantity: 1 });
          } else {
            state.mapping[index].quantity = state.mapping[index].quantity + 1;
          }
        });
      }
    },
    fitterStatus: (state, action) => {
      if (action.payload === "all") {
        state.billCopy = state.bill;
        return;
      }

      state.billCopy = state.bill.filter((bi) => bi?.status === action.payload);
    },
  },
  extraReducers: {
    [updateOrder.fulfilled]: (state, action) => {
      state.orderUpdate = action.payload;
      state.isLoading = false;
    },
    [updateOrder.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateOrder.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [createOrder.fulfilled]: (state, action) => {
      state.order = action.payload;
    },
    [createOrder.pending]: (state, action) => {
      state.isLoading = true;
    },
    [myOrder.fulfilled]: (state, action) => {
      state.allOrder = action.payload;
      state.bill = action.payload;
      state.isLoading = false;
      state.billCopy = action.payload;
    },
    [myOrder.pending]: (state, action) => {
      state.isLoading = true;
    },
    [payment.fulfilled]: (state, action) => {
      state.urlPayment = action.payload;
      state.isPaymentLoading = false;
    },
    [payment.pending]: (state, action) => {
      state.isPaymentLoading = true;
    },
    [getallOrder.fulfilled]: (state, action) => {
      state.orders = action.payload;
      state.isLoading = false;
    },
    [getallOrder.pending]: (state, action) => {
      state.isLoading = true;
    },
  },
});
const { reducer, actions } = order;
export const { orderdetail, mapping, deliveryAction, fitterStatus } = actions;
export default reducer;
