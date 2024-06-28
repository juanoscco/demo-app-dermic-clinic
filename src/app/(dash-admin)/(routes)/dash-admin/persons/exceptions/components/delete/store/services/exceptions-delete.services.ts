import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from '@/app/(dash-admin)/utils/';

const baseUrl = process.env.API_DOCKER_JAVA_REST;

export const employeeExceptionsDeleteApi = createApi({
  reducerPath: 'employeeExceptionsDeleteApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    deleteExceptionEmployee: builder.mutation({
      query: ({ deleteExceptionEmployeeId }) => ({
        url: `/excepcion/${deleteExceptionEmployeeId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useDeleteExceptionEmployeeMutation } = employeeExceptionsDeleteApi;
