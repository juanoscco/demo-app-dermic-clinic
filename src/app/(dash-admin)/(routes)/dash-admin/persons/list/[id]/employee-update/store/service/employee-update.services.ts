import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { prepareHeaders } from '@/app/(dash-admin)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const employeeUpdateApi = createApi({
  reducerPath: 'employeeUpdateApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    updateEmployee: builder.mutation({
      query: ({ employeeId, employeeData }) => ({
        url: `empleado/${employeeId}`,
        method: 'PUT',
        body: employeeData,
      }),
    }),
  }),
});

export const { useUpdateEmployeeMutation } = employeeUpdateApi;