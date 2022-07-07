import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TagApi from "../app/TagApi";
export const getTags = createAsyncThunk("/tag", async (params, APIthunk) => {
  const res = await TagApi.get();
  return res;
});
export const createTag = createAsyncThunk(
  "/tag/create",
  async (params, APIthunk) => {
    const res = await TagApi.create(params);
    return res;
  }
);
const trademark = createSlice({
  name: "tags",
  initialState: {
    tags: [],
    isLoadingTags: false,
  },
  reducers: {},
  extraReducers: {
    [getTags.fulfilled]: (state, action) => {
      state.isLoadingTags = false;
      state.tags = action.payload;
    },
  },
});

const { reducer, actions } = trademark;
export default reducer;
