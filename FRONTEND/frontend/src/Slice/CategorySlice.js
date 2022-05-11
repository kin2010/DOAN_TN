import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CategoriesApi from '../app/CategoriesApi';
const subs = [
  {
    _id: '6274a34a4155891f2b869062',
    name: 'Chăm sóc da',
    categoryId: '627499aa630c7314184823ab',
    description: 'category ok',
  },
  {
    _id: '6274a34a4155891f2b869063',
    name: 'Tẩy trang',
    categoryId: '627499aa630c7314184823ab',
    description: 'category ok',
  },
  {
    _id: '6274a34a4155891f2b869064',
    name: 'Sửa rửa mặt',
    categoryId: '627499aa630c7314184823ab',
    description: 'category ok',
  },
  {
    _id: '6274a34a4155891f2b869065',
    name: 'Tẩy tế bào chết',
    categoryId: '627499aa630c7314184823ab',
    description: 'category ok',
  },
  {
    _id: '6274a34a4155891f2b869066',
    name: 'Kem chống nắng',
    categoryId: '627499aa630c7314184823ab',
    description: 'category ok',
  },
  {
    _id: '6274a34a4155891f2b869067',
    name: 'Dưỡng mát',
    categoryId: '627499aa630c7314184823ab',
    description: 'category ok',
  },
  {
    _id: '6274a34a4155891f2b869068',
    name: 'Dưỡng ẩm',
    categoryId: '627499aa630c7314184823ab',
    description: 'category ok',
  },
  {
    _id: '6274a34a4155891f2b869069',
    name: 'Dưỡng trắng',
    categoryId: '627499aa630c7314184823ab',
    description: 'category ok',
  },
];
export const getAllCategories = createAsyncThunk(
  '/category/getall',
  async (params, APIthunk) => {
    const res = await CategoriesApi.getAll();
    return res;
  },
);
export const getAllSub = createAsyncThunk(
  '/category/getallsub',
  async (params, APIthunk) => {
    const res = await CategoriesApi.getAllSub();
    return res;
  },
);
const categories = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    subCategories: subs,
    showSub: subs,
    isLoading: false,
  },
  reducers: {
    showSubCategories: (state, action) => {
      if (state.subCategories.length > 0) {
        const newSub = state.subCategories.filter(
          (cate) => cate.categoryId === action.payload,
        );
        console.log(action, newSub);
        state.showSub = newSub;
      }
    },
  },
  extraReducers: {
    [getAllCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    },
    [getAllCategories.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllSub.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.subCategories = action.payload;
    },
    [getAllSub.pending]: (state, action) => {
      state.isLoading = true;
    },
  },
});
const { reducer, actions } = categories;
export const { showSubCategories } = actions;
export default reducer;
