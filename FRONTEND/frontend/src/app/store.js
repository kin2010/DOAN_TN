import { configureStore } from '@reduxjs/toolkit';
import CategoriesReduces from '../Slice/CategorySlice';
const rootReducer = {
  category: CategoriesReduces,
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
