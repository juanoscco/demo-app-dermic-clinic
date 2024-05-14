import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.migo.pe/api/v1/',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getDniData: builder.mutation({
      query: ({ token, dni }) => ({
        url: 'dni',
        method: 'POST',
        body: { token, dni },
      }),
    }),
  }),
});

export const { useGetDniDataMutation } = apiSlice;

export default apiSlice;
