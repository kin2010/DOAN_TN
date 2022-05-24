import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthApi } from '../app/AuthApi';
import { getToken } from '../Utils/Common';
const auths = createSlice({
  name: 'auth',
  initialState: {
    user: [],
    token: getToken(),
    showOTP: false,
    isVerify: false,
  },
  reducers: {
    nullToken: (state, action) => {
      state.token = null;
      state.user = [];
    },
    reState: (state, action) => {
      state.showOTP = false;
      state.isVerify = false;
    },
  },
  extraReducers: (builder) => {
    // Xử lý logic khi endpoint login được fulfilled
    builder.addMatcher(
      AuthApi.endpoints.login.matchFulfilled,
      (state, action) => {
        console.log('changing token', action.payload.token);
        // Lưu thông tin user vào state
        state.user = action.payload.user;
        state.token = action.payload.token;
      },

      AuthApi.endpoints.register.matchPending,
      (state, action) => {
        console.log(action);
      },
    );
    builder.addMatcher(
      AuthApi.endpoints.register.matchFulfilled,
      (state, action) => {
        // Lưu thông tin user vào state
        console.log(action.payload);
        if (action.payload.status === 200) {
          state.showOTP = true;
        }
      },
    );
    builder.addMatcher(
      AuthApi.endpoints.verify.matchFulfilled,
      (state, action) => {
        // Lưu thông tin user vào state
        console.log(action.payload);
        if (action.payload.message) {
          state.isVerify = true;
        }
      },
    );
  },
});
export const { reducer, actions } = auths;
export const { nullToken, reState } = actions;
export default reducer;
