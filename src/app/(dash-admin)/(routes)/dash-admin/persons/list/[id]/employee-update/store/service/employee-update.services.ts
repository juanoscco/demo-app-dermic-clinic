import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const employeeUpdateApi = createApi({
  reducerPath: 'employeeUpdateApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
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