import { configureStore } from '@reduxjs/toolkit';
import CategoriesReduces from '../Slice/CategorySlice';
import ProductReduces from '../Slice/ShopSlice';
const rootReducer = {
  category: CategoriesReduces,
  products: ProductReduces,
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
