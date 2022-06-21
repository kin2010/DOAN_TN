import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiURL } from '../Context/constant';
export const ProductQuery = createApi({
  reducerPath: 'productQuery',
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiURL}`,
    prepareHeaders: (headers, { getState }) => {
      // mutation-> query->settoken

      const token = getState().auths.token;
      console.log(token, getState().auths);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getone: builder.query({
      query: (body) => ({
        url: `/products/${body._id}`,
        method: 'GET',
      }),
    }),
  }),
});
export const { useGetoneQuery } = ProductQuery;
