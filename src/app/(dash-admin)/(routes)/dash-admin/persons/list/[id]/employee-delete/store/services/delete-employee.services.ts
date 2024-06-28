import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from '@/app/(dash-admin)/utils/';

const baseUrl = process.env.API_DOCKER_JAVA_REST;

export const employeeDeleteApi = createApi({
  reducerPath: 'employeeDeleteApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    deleteEmployee: builder.mutation({
      query: ({ deleteEmployeeId }) => ({
        url: `/empleado/${deleteEmployeeId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useDeleteEmployeeMutation } = employeeDeleteApi;
