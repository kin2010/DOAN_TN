import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiURL } from "../Context/constant";
import CategoriesReduces from "../Slice/CategorySlice";
import ProductReduces from "../Slice/ShopSlice";
import AuthReduces from "../Slice/AuthSlice";
import CartReduces from "../Slice/CartSlice";
import OrderReduces from "../Slice/OrderSlice";
import TrademarkReduces from "../Slice/Trademark";
import TagReduces from "../Slice/TagSlice";
import { AuthApi } from "./AuthApi";
import { ProductQuery } from "./ProductQuery";
const rootReducer = {
  category: CategoriesReduces,
  products: ProductReduces,
  auths: AuthReduces,
  carts: CartReduces,
  orders: OrderReduces,
  trademarks: TrademarkReduces,
  tags: TagReduces,
  [AuthApi.reducerPath]: AuthApi.reducer,
  [ProductQuery.reducerPath]: ProductQuery.reducer,
};
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApi.middleware),
});
export default store;
