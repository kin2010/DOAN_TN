import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductApi from "../app/ProductApi";
export const getAllProducts = createAsyncThunk(
  "/products/getall",
  async (params, APIthunk) => {
    const res = await ProductApi.getAll(params);
    return res;
  }
);
export const getAllProductAdmin = createAsyncThunk(
  "/products/getallAdmin",
  async (params, APIthunk) => {
    const res = await ProductApi.getAll(params);
    return res;
  }
);
export const getOne = createAsyncThunk(
  "/product/getone",
  async (params, APIthunk) => {
    const res = await ProductApi.getOne(params);
    return res;
  }
);
export const updateProduct = createAsyncThunk(
  "/product/update",
  async (params, APIthunk) => {
    const res = await ProductApi.update(params);
    return res;
  }
);
const products = createSlice({
  name: "products",
  initialState: {
    products: [],
    isLoading: false,
    isLoadingAdmin: false,
    pdAdmin: [],
    pdUpdate: null,
    copy: [],
  },
  reducers: {
    load: (state, action) => {
      state.isLoadingAdmin = true;
    },
    finish: (state, action) => {
      state.isLoadingAdmin = false;
    },
    sortProduct: (state, action) => {
      const MapRating = (cmt) => {
        if (!cmt) {
          return 0;
        }
        if (cmt.length > 0) {
          const vl = Object.values(cmt).reduce(
            (pre, vl) => pre + vl?.rating,
            0
          );
          return vl / Object.values(cmt).length;
        }
        return 0;
      };
      console.log(typeof action.payload);
      switch (action.payload) {
        case "2": {
          state.products.sort((a, b) => {
            return a?.price > b?.price ? -1 : 1;
          });
          break;
        }
        case "1": {
          state.products.sort((a, b) => {
            return a?.createdAt > b?.createdAt ? -1 : 1;
          });
          break;
        }
        case "3": {
          state.products.sort((a, b) => {
            return MapRating(a?.comments) > MapRating(b?.comments) ? -1 : 1;
          });
          break;
        }

        default: {
          state.products.sort((a, b) => {
            return a?.createdAt > b?.createdAt ? -1 : 1;
          });
        }
      }
    },
    searchProduct: (state, action) => {
      if (action.payload !== "") {
        state.products = state.products.filter((pd) =>
          pd?.name
            ?.toString()
            .toUpperCase()
            .includes(action?.payload?.toString().toUpperCase())
        );
      } else state.products = state.copy;
    },
  },
  extraReducers: {
    [getAllProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.copy = action.payload;
    },
    [getAllProducts.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllProductAdmin.fulfilled]: (state, action) => {
      state.isLoadingAdmin = false;
      state.pdAdmin = action.payload;
    },
    [getAllProductAdmin.pending]: (state, action) => {
      state.isLoadingAdmin = true;
    },
    [getOne.pending]: (state, action) => {
      state.isLoadingAdmin = true;
    },
    [getOne.fulfilled]: (state, action) => {
      state.pdUpdate = action.payload;
      state.isLoadingAdmin = false;
    },
    [updateProduct.pending]: (state, action) => {
      state.isLoadingAdmin = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.pdUpdate = action.payload;
      state.isLoadingAdmin = false;
    },
  },
});
const { reducer, actions } = products;
export const { load, finish, sortProduct, searchProduct } = actions;
export default reducer;

// extraReducers: (builder) => {
//   // Xử lý logic khi endpoint login được fulfilled
//   builder.addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
//     // Lưu thông tin user vào state
//     state.currentUser = action.payload;
//   });
// },
