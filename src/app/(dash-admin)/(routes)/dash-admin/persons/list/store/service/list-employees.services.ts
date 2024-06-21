import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { prepareHeaders } from '@/app/(dash-admin)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const listEmployeesApi = createApi({
  reducerPath: 'listEmployeesApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: ({ limit = 10, page = 0, filter = '' }) => `empleado?p=${page}&limit=${limit}&filtro=${filter}`,
    }),
  }),
});

export const { useGetEmployeesQuery } = listEmployeesApi;