
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const exceptionUpdateApi = createApi({
  reducerPath: 'exceptionUpdateApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    updateException: builder.mutation({
      query: ({ exceptionId, exceptionData }) => ({
        url: `excepcion/${exceptionId}`,
        method: 'PUT',
        body: exceptionData,
      }),
    }),
  }),
});

export const { useUpdateExceptionMutation } = exceptionUpdateApi;