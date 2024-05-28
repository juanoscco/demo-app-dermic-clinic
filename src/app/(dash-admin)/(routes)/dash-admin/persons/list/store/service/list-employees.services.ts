import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const listEmployeesApi = createApi({
  reducerPath: 'listEmployeesApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: ({ limit = 10, page = 0, filter = '' }) => `empleado?p=${page}&limit=${limit}&filtro=${filter}`,
    }),
  }),
});

export const { useGetEmployeesQuery } = listEmployeesApi;