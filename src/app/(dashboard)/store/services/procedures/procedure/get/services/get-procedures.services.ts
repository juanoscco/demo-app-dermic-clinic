import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { prepareHeaders } from '@/app/(dashboard)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const listProceduresApi = createApi({
  reducerPath: 'listProceduresApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders
  }),
  endpoints: (builder) => ({
    getProcedures: builder.query({
      query: ({ limit = 10, page = 0, filter = '' }) => `procedimiento?p=${page}&limit=${limit}&filtro=${filter}`,
    }),
  }),
});

export const { useGetProceduresQuery } = listProceduresApi;