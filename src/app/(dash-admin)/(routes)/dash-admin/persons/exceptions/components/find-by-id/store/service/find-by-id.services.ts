
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const exceptionDetailApi = createApi({
  reducerPath: 'exceptionDetailApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getExceptionById: builder.query({
      query: (id: number) => `excepcion/${id}`,
    }),
  }),
});

export const { useGetExceptionByIdQuery } = exceptionDetailApi;