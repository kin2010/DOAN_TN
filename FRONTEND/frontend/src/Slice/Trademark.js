import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TrademarkApi from "../app/Trademark";
export const getTrademarkApi = createAsyncThunk(
  "/trademark",
  async (params, APIthunk) => {
    const res = await TrademarkApi.get();
    return res;
  }
);
const trademark = createSlice({
  name: "trademarks",
  initialState: {
    trademark: [],
    isLoadingTrademark: false,
  },
  reducers: {},
  extraReducers: {
    [getTrademarkApi.fulfilled]: (state, action) => {
      state.isLoadingTrademark = false;
      state.trademark = action.payload;
    },
  },
});

const { reducer, actions } = trademark;
export default reducer;
