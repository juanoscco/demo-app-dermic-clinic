import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.API_MIGO_DNI_REST

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