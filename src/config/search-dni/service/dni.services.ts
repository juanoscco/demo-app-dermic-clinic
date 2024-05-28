"use client"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.API_MIGO_DNI_REST

// URL : 'https://api.migo.pe/api/v1/'

export const dniSearchApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
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

export const { useGetDniDataMutation } = dniSearchApi;

// export default apiSlice;
